import { FontAwesome6, ScrollView, Text, View } from '@/src/components/Themed';
import { AttributeListing } from '@/src/components/attribute-listing/AttributeListing';
import { TintButton } from '@/src/components/buttons/tint-button/TintButton';
import { useAedContext } from '@/src/context/AedContext';
import { useTranslation } from 'react-i18next';
import { Linking, Platform, StyleSheet } from 'react-native';
import openMap from 'react-native-open-maps';

export default () => {
  const { t } = useTranslation();
  const {
    state: { selectedData },
  } = useAedContext();
  const defibrillator = selectedData;
  const makeCall = (phoneNumber: string) => {
    if (Platform.OS === 'ios') {
      phoneNumber = `telprompt:${phoneNumber}`;
    } else {
      phoneNumber = `tel:${phoneNumber}`;
    }

    Linking.openURL(phoneNumber);
  };

  if (!defibrillator) {
    return <View></View>;
  }

  const properties = defibrillator.properties ?? {};
  const name = properties['defibrillator:location'] ?? properties.description ?? properties.operator ?? 'n/A';
  const emergencyPhone = properties['emergency:phone'] ?? '144';
  const coordinates = defibrillator.geometry.type === 'Point' ? defibrillator.geometry.coordinates : null;
  return (
    <>
      <View style={styles.innerContainerStyle}>
        <Text style={styles.titleStyle}>{name}</Text>
        <View style={styles.buttonContainerStyle}>
          <TintButton
            style={styles.buttonStyle}
            onPress={() =>
              openMap({
                latitude: coordinates?.[1],
                longitude: coordinates?.[0],
                end: `${coordinates?.[1]}, ${coordinates?.[0]}`,
                query: name,
                travelType: 'walk',
              })
            }
            title={t('directions')}
            icon={<FontAwesome6 style={styles.actionIconStyle} name="route" />}
          ></TintButton>
          <TintButton
            style={styles.buttonStyle}
            onPress={() => {
              makeCall(emergencyPhone);
            }}
            title={t('emergency_phone', { emergencyPhone })}
            icon={<FontAwesome6 name="phone-volume" />}
          ></TintButton>
        </View>
      </View>
      <ScrollView>
        <AttributeListing
          title={t('location')}
          icon={<FontAwesome6 style={styles.iconStyle} name="map-pin" />}
          value={properties['defibrillator:location']}
        />
        <AttributeListing title={t('level')} icon={<FontAwesome6 style={styles.iconStyle} name="stairs" />} value={properties.level} />
        <AttributeListing
          title={t('description')}
          icon={<FontAwesome6 style={styles.iconStyle} name="list" />}
          value={properties.description}
        />
        <AttributeListing
          title={t('openinghours')}
          icon={<FontAwesome6 style={styles.iconStyle} name="clock" />}
          value={properties.opening_hours}
        />
        <AttributeListing title={t('operator')} icon={<FontAwesome6 style={styles.iconStyle} name="flag" />} value={properties.operator} />
        <AttributeListing
          title={t('operatorphone')}
          icon={<FontAwesome6 style={styles.iconStyle} name="phone" />}
          value={properties.phone}
        />
        <AttributeListing
          title={t('access')}
          icon={<FontAwesome6 style={styles.iconStyle} name="universal-access" />}
          value={properties.access}
        />
        <AttributeListing title={t('indoor')} icon={<FontAwesome6 style={styles.iconStyle} name="building" />} value={properties.indoor} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    fontWeight: '500',
    margin: 10,
  },
  innerContainerStyle: {
    marginHorizontal: 5,
  },
  buttonStyle: {
    flex: 1,
  },
  buttonTextStyle: {
    fontSize: 18,
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },
  actionIconStyle: {
    fontSize: 18,
    marginRight: 10,
  },
  iconStyle: {
    fontSize: 24,
  },
});
