import { FontAwesome6, View } from '@/src/components/Themed';
import { Address } from '@/src/components/address/Address';
import { BottomSheetCloseButton } from '@/src/components/buttons/bottom-sheet-close-button/BottomSheetCloseButton';
import { TintButton } from '@/src/components/buttons/tint-button/TintButton';
import { useSearchContext } from '@/src/context/SearchContext';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

export default () => {
  const { t } = useTranslation();
  const { state, dispatch } = useSearchContext();
  const { snapToPosition } = useBottomSheet();

  useEffect(() => {
    snapToPosition('25%');
  }, []);

  const handleClose = () => {
    dispatch({ type: 'SET_SELECTED_RESULT', payload: null });
  };

  if (!state.selectedResult) {
    return null;
  }

  return (
    <View style={styles.container}>
      <BottomSheetCloseButton onPress={handleClose} />
      <Address feature={state.selectedResult} />
      <TintButton style={styles.buttonStyle} icon={<FontAwesome6 name="plus" size={24} />} title={t('create_aed_at_address')} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    width: '100%',
  },

  buttonStyle: {
    width: '100%',
  },
});
