import { FontAwesome6, Pressable, Text, View, useThemeColor } from '@/src/components/Themed';
import { useLocationContext } from '@/src/context/LocationContext';
import { useLocationDialog } from '@/src/hooks/useLocationDialog';
import { useTranslation } from 'react-i18next';
import { PressableStateCallbackType, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const LocationServiceOverlay = () => {
  const { t } = useTranslation();
  const safeAreaInsets = useSafeAreaInsets();
  const showLocationDialog = useLocationDialog();
  const background = useThemeColor({}, 'background');
  const backgroundActive = useThemeColor({}, 'tint');
  const {
    state: { isLocationServicesTurnedOn },
  } = useLocationContext();

  const handleOnLocationPress = () => {
    showLocationDialog();
  };

  const containerStyle = {
    height: safeAreaInsets.top + 25,
    ...styles.container,
  };
  const pressableStyle = (state: PressableStateCallbackType) => {
    return state.pressed
      ? { ...styles.pressable, backgroundColor: backgroundActive }
      : { ...styles.pressable, backgroundColor: background };
  };

  if (isLocationServicesTurnedOn) {
    return null;
  }
  return (
    <View style={containerStyle}>
      <Pressable style={pressableStyle} onPress={handleOnLocationPress}>
        <Text style={styles.textSize}>{t('location_service_off')}</Text>
        <FontAwesome6 style={styles.textSize} name="chevron-right" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    top: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
    pointerEvents: 'box-none',
  },
  pressable: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    gap: 5,
  },
  textSize: {
    fontSize: 13,
  },
});
