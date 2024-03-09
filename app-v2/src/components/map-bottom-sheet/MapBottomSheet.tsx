import { BottomSheetView } from '@gorhom/bottom-sheet';
import { PropsWithChildren, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { BottomSheet } from '../Themed';

interface Props extends PropsWithChildren {
  snapPoints: string[];
}

export const MapBottomSheet = (props: Props) => {
  // callbacks

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheet snapPoints={props.snapPoints} onChange={handleSheetChanges} keyboardBehavior="extend">
      <BottomSheetView style={styles.contentContainer}>{props.children}</BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
    height: '100%',
  },
});
