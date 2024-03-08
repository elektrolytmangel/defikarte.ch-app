import { View } from '@/src/components/Themed';
import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Map } from '../components/map/Map';
import { requestAedData } from '../services/aed-data.service';
import { toGeoJson } from '../services/geojson-convert.service';

export default function MainScreen() {
  const [aedData, setAedData] = useState<any>(null);

  useEffect(() => {
    const initData = async () => {
      const response = await requestAedData();
      setAedData(toGeoJson(response));
    };
    initData();
  }, []);

  return (
    <View style={styles.container}>
      {!aedData ? (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <Map data={aedData} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
