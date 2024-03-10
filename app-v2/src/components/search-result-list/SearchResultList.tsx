import { FeatureCollection, Feature } from 'geojson';
import { StyleSheet } from 'react-native';
import { ScrollView } from '../Themed';
import { SearchResult } from './search-result/SearchResult';

type Props = {
  searchResult: FeatureCollection;
  onPress?: (feature: Feature) => void;
};

export const SearchResultList = (props: Props) => {
  const resultList = props.searchResult.features.map((feature) => {
    return <SearchResult key={feature.id} feature={feature} onPress={props.onPress} />;
  });

  return <ScrollView style={styles.container}>{resultList}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
    height: '100%',
  },
});
