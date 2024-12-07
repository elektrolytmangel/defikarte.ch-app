import { BottomSheetTextInput, BottomSheetTextInputProps, FontAwesome6, View } from '@/src/components/Themed';
import { TextButton } from '@/src/components/buttons/text-button/TextButton';
import { TintButton } from '@/src/components/buttons/tint-button/TintButton';
import { SearchResultList } from '@/src/components/search-result-list/SearchResultList';
import { useSearchContext } from '@/src/context/SearchContext';
import { searchAddress } from '@/src/services/adress-search.service';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { Feature } from 'geojson';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default () => {
  const { t } = useTranslation();
  const safeAreaInsets = useSafeAreaInsets();
  const { state, dispatch } = useSearchContext();
  const [searchText, setSearchText] = useState('');
  const [isInputFocus, setIsInputFocus] = useState(false);
  const inputRef = useRef<BottomSheetTextInputProps>();
  const { expand, collapse } = useBottomSheet();

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
    setSearchText(state.searchText);
  }, [state.searchText]);

  useEffect(() => {
    const count = state.searchResults?.features?.length;
    if (searchText && count && count > 0) {
      expand();
    }

    if (!searchText && (!count || count === 0) && !isInputFocus) {
      collapse();
    }
  }, [searchText, state.searchResults, isInputFocus]);

  const handleSearchResultPress = (feature: Feature) => {
    dispatch({ type: 'SET_SELECTED_RESULT', payload: feature });
    router.navigate('address');
  };

  const handleCancelSearch = () => {
    dispatch({ type: 'SET_SEARCH_RESULTS', payload: { searchText: '', searchResults: null } });
    inputRef?.current?.blur();
    inputRef?.current?.clear();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchInputGroup}>
        <BottomSheetTextInput
          ref={inputRef}
          placeholder={t('search_address')}
          value={searchText}
          onChangeText={(t: string) => setSearchText(t)}
          onFocus={() => setIsInputFocus(true)}
          onBlur={() => setIsInputFocus(false)}
          style={styles.searchInput}
        />
        {isInputFocus || state.searchResults !== null ? <TextButton title={t('cancel')} onPress={() => handleCancelSearch()} /> : null}
      </View>
      <SearchResultList searchResult={state.searchResults} onPress={(f) => handleSearchResultPress(f)} />
      {!isInputFocus && state.searchResults === null ? (
        <View style={styles.menuGroup}>
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
    width: '100%',
  },
  searchInputGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  searchInput: {
    flexGrow: 1,
  },
});
