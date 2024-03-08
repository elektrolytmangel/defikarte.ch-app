import { View, Image } from "react-native";

const icon = require("@/assets/images/favicon.png");

export const MarkerOverlay = () => {
  return (
    <View
      style={{
        position: "absolute",
        margin: "auto",
        width: "100%",
        height: "100%",
        borderColor: "red",
        borderWidth: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={icon} style={{}} />
    </View>
  );
};

/* 
<MapLibreGL.MarkerView coordinate={[center.lon, center.lat]}>
            <View>
              <Image source={icon} />
            </View>
          </MapLibreGL.MarkerView>
*/
