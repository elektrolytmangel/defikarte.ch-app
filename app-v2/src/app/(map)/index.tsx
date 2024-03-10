import { BottomSheetTextInput, FontAwesome6, View } from '@/src/components/Themed';
import { TintButton } from '@/src/components/buttons/tint-button/TintButton';
import { SearchResultList } from '@/src/components/search-result-list/SearchResultList';
import { searchAddress } from '@/src/services/adress-search.service';
import { router } from 'expo-router';
import { FeatureCollection } from 'geojson';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default () => {
  const { t } = useTranslation();
  const safeAreaInsets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState<FeatureCollection>({ type: 'FeatureCollection', features: [] });

  useEffect(() => {
    const requestSearch = async () => {
      if (searchText.length < 3) {
        return;
      } else if (searchText.length === 0) {
        setSearchResult({ type: 'FeatureCollection', features: [] });
        return;
      }

      const result = await searchAddress(searchText);
      setSearchResult(result);
    };

    const timeout = setTimeout(() => requestSearch(), 500);
    return () => clearTimeout(timeout);
  }, [searchText]);

  const menuGroupStyle = {
    paddingBottom: safeAreaInsets.bottom !== 0 ? safeAreaInsets.bottom : 10,
    ...styles.menuGroup,
  };
  return (
    <View style={styles.container}>
      <BottomSheetTextInput placeholder={t('search_address')} value={searchText} onChangeText={(t: string) => setSearchText(t)} />
      <SearchResultList searchResult={searchResult} onPress={(f) => console.log(f)} />
      {searchText === '' ? (
        <View style={menuGroupStyle}>
          <TintButton title={t('about')} icon={<FontAwesome6 name="info" size={16} />} onPress={() => router.navigate('about')} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  menuGroup: {
    position: 'relative',
    width: '100%',
    bottom: 0,
  },
});
