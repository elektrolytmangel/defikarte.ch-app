﻿using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using DefikarteBackend.Model;
using DefikarteBackend.OsmOverpassApi;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using OsmSharp;
using OsmSharp.IO.API;
using OsmSharp.Tags;

namespace DefikarteBackend
{
    public class DefibrillatorFunction
    {
        private readonly IConfigurationRoot config;

        public DefibrillatorFunction(IConfigurationRoot config)
        {
            this.config = config;
        }

        [FunctionName("Defibrillators_GETALL")]
        public async Task<IActionResult> GetAll(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "defibrillator")] HttpRequestMessage req,
            ILogger log)
        {
            var overpassApiUrl = config["overpassUrl"];
            log.LogInformation($"Get all AED from {overpassApiUrl}");

            var overpassApiClient = new OverpassClient(overpassApiUrl);

            try
            {
                var response = await overpassApiClient.GetAllDefibrillatorsInSwitzerland();
                return new OkObjectResult(response);
            }
            catch (Exception ex)
            {
                return new ExceptionResult(ex, false);
            }
        }


        [FunctionName("Defibrillators_POST")]
        public async Task<IActionResult> Create(
            [HttpTrigger(AuthorizationLevel.Anonymous, "Post", Route = "defibrillator")] HttpRequestMessage req,
            ILogger log)
        {
            var requestBody = await req.Content.ReadAsStringAsync();
            if (string.IsNullOrEmpty(requestBody))
            {
                return new BadRequestObjectResult("body is null or empty. please provide a valid OsmGeo object.");
            }

            try
            {
                var username = config["osmUsername"];
                var password = config["osmUserPassword"];
                var osmApiUrl = config["osmApiUrl"];
                
                if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(osmApiUrl))
                {
                    log.LogWarning("No valid configuration available for eighter username, password or osmApiUrl");
                    return new InternalServerErrorResult();
                }

                log.LogInformation($"Create on {osmApiUrl} new node:{requestBody}");

                var defibrillatorObj = JsonConvert.DeserializeObject<DefibrillatorRequest>(requestBody);
                var newNode = CreateNode(defibrillatorObj);

                var clientFactory = new ClientsFactory(log, new HttpClient(),
                    osmApiUrl);

                var authClient = clientFactory.CreateBasicAuthClient(username, password);
                var changeSetTags = new TagsCollection() { new Tag("created_by", username), new Tag("comment", "Create new AED.") };
                var changeSetId = await authClient.CreateChangeset(changeSetTags);

                newNode.ChangeSetId = changeSetId;
                var nodeId = await authClient.CreateElement(changeSetId, newNode);
                
                await authClient.CloseChangeset(changeSetId);

                var createdNode = await authClient.GetNode(nodeId);

                log.LogInformation($"Added new node {nodeId}");
                return new OkObjectResult(createdNode) { StatusCode = 201 };
            }
            catch (JsonSerializationException ex)
            {
                log.LogError(ex.ToString());
                return new BadRequestObjectResult(ex.Message);
            }
            catch (Exception ex)
            {
                log.LogError(ex.ToString());
                return new ExceptionResult(ex, false);
            }
        }

        private Node CreateNode(DefibrillatorRequest request)
        {
            var tags = new Dictionary<string, string>
            {
                {
                    "emergency", "defibrillator"
                },
                {
                    "emergency:phone", request.EmergencyPhone
                },
                {
                    "defibrillator:location", request.Location
                },
                {
                    "opening_hours", request.OpeningHours
                },
                {
                    "phone", request.OperatorPhone
                },
                {
                    "operator", request.Operator
                },
                {
                    "access", request.Accessible ? "yes" : "no"
                },
                {
                    "indoor", request.Indoor ? "yes" : "no"
                }
            };

            return new Node()
            {
                Latitude = request.Latitude,
                Longitude = request.Longitude,
                Tags = new TagsCollection(tags),
            };
        }
    }
}
