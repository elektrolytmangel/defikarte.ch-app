import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { Text, View } from '@/src/components/Themed';

export const Template = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text>{t('template')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
