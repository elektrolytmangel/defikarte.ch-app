import { FontAwesome6, View } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { IconButton } from '../icon-button/IconButton';

type Props = {
  onPress: () => void;
};

export const BottomSheetCloseButton = (props: Props) => {
  const handleClose = () => {
    props.onPress();
    if (router.canGoBack()) {
      router.back();
    } else {
      router.navigate('/');
    }
  };

  return (
    <View style={styles.closeButtonContainer}>
      <IconButton
        icon={<FontAwesome6 name="xmark" size={16} />}
        lightColor={Colors.light.tint}
        darkColor={Colors.dark.tint}
        size="x-small"
        onPress={() => handleClose()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  closeButtonContainer: {
    position: 'absolute',
    top: 0,
    right: 5,
    zIndex: 1000,
  },
});
