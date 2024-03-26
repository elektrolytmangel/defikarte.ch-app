import { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { router } from 'expo-router';
import { PropsWithChildren, useCallback, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheet } from '../Themed';

interface Props extends PropsWithChildren {
  snapPoints: string[];
  setSnapPoints: (snapPoints: string[]) => void;
  onClose?: () => void;
}

export const MapBottomSheet = (props: Props) => {
  const ref = useRef<BottomSheetMethods>(null);
  const safeAreaInsets = useSafeAreaInsets();

  const handleSheetChanges = useCallback((index: number) => {}, []);

  const hanldeOnClose = () => {
    router.replace('/');
    ref.current?.collapse();
    props.onClose?.();
  };

  const contentContainerStyle = {
    ...styles.contentContainer,
    paddingBottom: safeAreaInsets.bottom,
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
      <BottomSheetView style={contentContainerStyle}>{props.children}</BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
    flex: 1,
  },
});
