import backend from "../api/backend";

export const requestAedData = async (): Promise<any> => {
  try {
    const response = await backend.get("/v2/defibrillator", {
      method: "GET",
      headers: {
        "ACCESS-Control-Allow-Origin": "*",
      },
    });
    if (response.status === 200) {
      const data = await response.data;
      return data;
    }
  } catch (error) {
    console.error(error);
  }

  return [];
};
