import { Feature } from 'geojson';
import { StyleSheet } from 'react-native';
import { Pressable, Text } from '../../Themed';
import Colors from '@/src/constants/Colors';

type Props = {
  feature: Feature;
  onPress?: (feature: Feature) => void;
};

export const SearchResult = (props: Props) => {
  const street = props.feature.properties?.label.split('<b>')[0];
  const municipality = props.feature.properties?.label.split('<b>')[1].split('</b>')[0];
  return (
    <Pressable
      style={styles.container}
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
      onPress={() => props.onPress?.(props.feature)}
    >
      <Text style={styles.streetText}>{street}</Text>
      <Text style={styles.municipalityText}>{municipality}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    gap: 5,
  },
  municipalityText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  streetText: {
    fontSize: 16,
  },
});
