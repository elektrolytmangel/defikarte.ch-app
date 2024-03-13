import { BottomSheetTextInput, FontAwesome6, View } from '@/src/components/Themed';
import { TintButton } from '@/src/components/buttons/tint-button/TintButton';
import { SearchResultList } from '@/src/components/search-result-list/SearchResultList';
import { useSearchContext } from '@/src/context/SearchContext';
import { searchAddress } from '@/src/services/adress-search.service';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { Feature } from 'geojson';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default () => {
  const { t } = useTranslation();
  const safeAreaInsets = useSafeAreaInsets();
  const { state, dispatch } = useSearchContext();
  const [searchText, setSearchText] = useState(state.searchText);
  const [isInputFocus, setIsInputFocus] = useState(false);
  const { collapse } = useBottomSheet();

  useEffect(() => {
    const requestSearch = async () => {
      if (searchText.length === 0) {
        dispatch({ type: 'SET_SEARCH_RESULTS', payload: { searchText: '', searchResults: null } });
        return;
      }

      if (searchText.length < 3) {
        return;
      }

      const result = await searchAddress(searchText);
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: { searchText, searchResults: result } });
    };

    const timeout = setTimeout(() => requestSearch(), 500);
    return () => clearTimeout(timeout);
  }, [searchText]);

  useEffect(() => {
    collapse();
  }, []);

  const handleSearchResultPress = (feature: Feature) => {
    dispatch({ type: 'SET_SELECTED_RESULT', payload: feature });
    router.navigate('address');
  };

  const menuGroupStyle = {
    paddingBottom: safeAreaInsets.bottom !== 0 ? safeAreaInsets.bottom : 10,
    ...styles.menuGroup,
  };
  return (
    <View style={styles.container}>
      <BottomSheetTextInput
        placeholder={t('search_address')}
        value={searchText}
        onChangeText={(t: string) => setSearchText(t)}
        onFocus={() => setIsInputFocus(true)}
        onBlur={() => setIsInputFocus(false)}
      />
      <SearchResultList searchResult={state.searchResults} onPress={(f) => handleSearchResultPress(f)} />
      {!isInputFocus && state.searchResults === null ? (
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
