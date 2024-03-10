import { ScrollView, Text, View, useThemeColor } from '@/src/components/Themed';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { Image, Linking, Platform, Pressable, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export default function ModalScreen() {
  const { t } = useTranslation();
  const tint = useThemeColor({}, 'tint');

  const wrapperStyle = {
    borderBottomColor: tint,
    ...styles.wrapperStyle,
  };
  return (
    <ScrollView style={styles.container}>
      <Image style={styles.imageStyle} source={require('@/assets/images/logo-defikarte.png')} />
      <Text style={styles.versionText}>v2.0.0-alpha.1 / preview</Text>
      <View style={wrapperStyle}>
        <Text style={styles.titleStyle}>{t('the_project')}</Text>
        <Text style={styles.textStyle}>{t('about_the_project_text')}</Text>
      </View>
      <View style={wrapperStyle}>
        <Text style={styles.titleStyle}>OpenBrackets Association Switzerland</Text>
        <Text style={styles.linkStyle} onPress={() => Linking.openURL('https://www.openbrackets.ch')}>
          www.OpenBrackets.ch
        </Text>
        <Text style={styles.linkStyle} onPress={() => Linking.openURL('https://www.defikarte.ch')}>
          www.defikarte.ch
        </Text>
      </View>

      <View style={wrapperStyle}>
        <Text style={styles.titleStyle}>{t('osm_contributors')}</Text>
        <Text style={styles.linkStyle} onPress={() => Linking.openURL('https://www.openstreetmap.org/copyright')}>
          www.openstreetmap.org/copyright
        </Text>
      </View>
      <View style={wrapperStyle}>
        <Text style={styles.titleStyle}>{t('app_sponsored_by')}</Text>
        <Pressable onPress={() => Linking.openURL('https://www.aed.ch')}>
          <Image style={styles.imageStyle} source={require('@/assets/images/procamed.jpg')} />
        </Pressable>
        <Text style={styles.titleStyle}>{t('thanks_to_all_sponsors')}</Text>
        <Text style={styles.linkStyle} onPress={() => Linking.openURL('https://www.defikarte.ch/sponsors.html')}>
          www.defikarte.ch/sponsors.html
        </Text>
      </View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 10,
  },
  wrapperStyle: {
    marginHorizontal: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  textStyle: {
    fontSize: 16,
  },
  linkStyle: {
    fontSize: 20,
    color: Colors.light.secondaryColor,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  imageStyle: {
    height: 100,
    width: '100%',
    marginBottom: 10,
  },
  versionText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 0,
  },
});
