import { BottomSheetTextInput, FontAwesome6, View } from '@/src/components/Themed';
import { TintButton } from '@/src/components/buttons/tint-button/TintButton';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default () => {
  const { t } = useTranslation();
  const safeAreaInsets = useSafeAreaInsets();

  const menuGroupStyle = {
    paddingBottom: safeAreaInsets.bottom,
    ...styles.menuGroup,
  };
  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <BottomSheetTextInput placeholder={t('search_address')} />
        <View style={menuGroupStyle}>
          <TintButton title={t('about')} icon={<FontAwesome6 name="info" size={16} />} onPress={() => router.navigate('about')} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  menuGroup: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
});
