import { Text, View } from '@/src/components/Themed';
import { StatusBar } from 'expo-status-bar';
import { Image, Linking, Platform, ScrollView, StyleSheet } from 'react-native';

export default function ModalScreen() {
  return (
    <ScrollView style={styles.container}>
      <Image style={styles.imageStyle} source={require('@/assets/images/logo-defikarte.png')} />
      <View style={styles.wrapperStyle}>
        <Text style={styles.titleStyle}>Das Projekt</Text>
        <Text style={styles.textStyle}>
          Die Defikarte.ch-App hilft dabei, den nächsten Defibrillator in deiner Nähe zu finden. Über die Navigations-App des jeweiligen
          Gerätes, kannst du dich zu diesem navigieren lassen. So kann möglichst rasch einer Person in Not geholfen werden. Die Daten sind
          Open Source und werden von der Community in OpenStreetMaps (OSM) gepflegt und verwaltet. Da es in der Schweiz keinen kompletten
          Datensatz und auch keine Meldepflicht für Defibrillatoren gibt, sind nicht alle erfasst und somit auch nicht in der App
          ersichtlich. Die OSM-Community ist bemüht, die Daten aktuell und vollständig zu halten. Bemerkst du also, dass ein Defibrillator
          nicht eingetragen ist, unterstütze die Community und den guten Zweck indem du den fehlenden Defibrillator mithilfe dieser App mit
          Leichtigkeit erfasst.
        </Text>
      </View>
      <View style={styles.wrapperStyle}>
        <Text style={styles.titleStyle}>Webseite</Text>
        <Text style={styles.linkStyle} onPress={() => Linking.openURL('https://www.defikarte.ch')}>
          https://www.defikarte.ch
        </Text>
      </View>
      <View style={styles.wrapperStyle}>
        <Text style={styles.titleStyle}>OpenStreetMap </Text>
        <Text style={styles.textStyle}>
          OpenStreetMap Mitwirkende (
          <Text style={styles.linkStyle} onPress={() => Linking.openURL('https://www.openstreetmap.org/copyright')}>
            https://www.openstreetmap.org/copyright
          </Text>
          )
        </Text>
      </View>
      <Image style={styles.imageStyle} source={require('@/assets/images/procamed.jpg')} />
      <View style={styles.wrapperStyle}>
        <Text style={styles.titleStyle}>exklusiver Platin Sponsor</Text>
        <Text style={styles.linkStyle} onPress={() => Linking.openURL('https://www.aed.ch')}>
          https://www.aed.ch
        </Text>
      </View>
      <View style={styles.wrapperStyle}>
        <Text style={styles.titleStyle}>Vielen Dank an alle unsere Sponsoren</Text>
        <Text style={styles.linkStyle} onPress={() => Linking.openURL('https://www.defikarte.ch/sponsors.html')}>
          https://www.defikarte.ch/sponsors.html
        </Text>
      </View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingBottom: 30,
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
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: '500',
  },
  wrapperStyle: {
    marginHorizontal: 10,
    marginBottom: 18,
  },
  textStyle: {
    fontSize: 16,
    alignSelf: 'center',
  },
  linkStyle: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
  },
  imageStyle: {
    height: 150,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 10,
  },
});
