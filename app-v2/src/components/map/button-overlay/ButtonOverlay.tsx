import { FontAwesome6, View } from '@/src/components/Themed';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { IconButton } from '../../buttons/icon-button/IconButton';
import Colors from '@/src/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ButtonOverlay = () => {
  const { t } = useTranslation();
  const safeAreaInsets = useSafeAreaInsets();

  const containerStyle = {
    top: 35 + safeAreaInsets.top,
    ...styles.container,
  };
  return (
    <View style={containerStyle}>
      <View style={styles.topContainer}>
        <IconButton
          style={{}}
          icon={
            <FontAwesome6 lightColor={Colors.light.primaryColor} darkColor={Colors.dark.primaryColor} name="location-arrow" size={24} />
          }
          onPress={() => {}}
        />
        <IconButton
          style={{}}
          icon={<FontAwesome6 lightColor={Colors.light.primaryColor} darkColor={Colors.dark.primaryColor} name="layer-group" size={24} />}
          onPress={() => {}}
        />
      </View>
      <IconButton
        style={{}}
        icon={<FontAwesome6 lightColor={Colors.light.primaryColor} darkColor={Colors.dark.primaryColor} name="plus" size={24} />}
        onPress={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '73%',
    end: 10,
    position: 'absolute',
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
  },
  topContainer: {
    backgroundColor: 'transparent',
    gap: 10,
  },
});
