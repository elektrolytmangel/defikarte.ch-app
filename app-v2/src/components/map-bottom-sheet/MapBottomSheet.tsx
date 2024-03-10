import { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { router } from 'expo-router';
import { PropsWithChildren, useCallback, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { BottomSheet } from '../Themed';

interface Props extends PropsWithChildren {
  snapPoints: string[];
  setSnapPoints: (snapPoints: string[]) => void;
  onClose?: () => void;
}

export const MapBottomSheet = (props: Props) => {
  const ref = useRef<BottomSheetMethods>(null);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  const hanldeOnClose = () => {
    props.setSnapPoints(['15%', '90%']);
    router.navigate('/');
    ref.current?.collapse();
    props.onClose?.();
  };

  return (
    <BottomSheet
      ref={ref}
      snapPoints={props.snapPoints}
      onChange={handleSheetChanges}
      keyboardBehavior="extend"
      onClose={hanldeOnClose}
      enablePanDownToClose
    >
      <BottomSheetView style={styles.contentContainer}>{props.children}</BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
  },
});
