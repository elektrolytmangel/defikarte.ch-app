import { FontAwesome6, View } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconButton } from '../../buttons/icon-button/IconButton';

type Props = {
  onPositionPress: () => void;
  onLayerPress: () => void;
  onAddPress: () => void;
};

export const ButtonOverlay = (props: Props) => {
  const safeAreaInsets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const percent15OfWindowHeigth = height * 0.15;
  const containerStyle = {
    top: safeAreaInsets.top,
    paddingVertical: 15,
    height: height - percent15OfWindowHeigth - safeAreaInsets.top,
    ...styles.container,
  };

  return (
    <View style={containerStyle}>
      <View style={styles.topContainer}>
        <IconButton
          icon={
            <FontAwesome6 lightColor={Colors.light.primaryColor} darkColor={Colors.dark.primaryColor} name="location-arrow" size={24} />
          }
          onPress={props.onPositionPress}
        />
        <IconButton
          icon={<FontAwesome6 lightColor={Colors.light.primaryColor} darkColor={Colors.dark.primaryColor} name="layer-group" size={24} />}
          onPress={props.onLayerPress}
        />
      </View>
      <IconButton
        size="large"
        icon={<FontAwesome6 lightColor={Colors.light.primaryColor} darkColor={Colors.dark.primaryColor} name="plus" size={24} />}
        onPress={props.onAddPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    pointerEvents: 'box-none',
    gap: 10,
    right: 10,
  },
  topContainer: {
    backgroundColor: 'transparent',
    gap: 10,
  },
});
