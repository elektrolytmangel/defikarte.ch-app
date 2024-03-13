import Colors from '@/src/constants/Colors';
import { Feature, GeoJsonProperties } from 'geojson';
import { StyleSheet } from 'react-native';
import { Pressable, View, Text, useThemeColor, FontAwesome6 } from '../Themed';

const ICON_TAG = '<i>';
const ICON_TAG_END = '</i>';
const BOLD_TAG = '<b>';
const BOLD_TAG_END = '</b>';
const TAG_LIST = [ICON_TAG, ICON_TAG_END, BOLD_TAG, BOLD_TAG_END];

const objectclassIconMappping: { [key: string]: string } = {
  TLM_SIEDLUNGSNAME: 'map-pin',
  TLM_FREIZEITAREAL: 'volleyball',
  TLM_STRASSE: 'road',
  TLM_GELAENDENAME: 'map-pin',
  TLM_FLURNAME: 'map-pin',
  TLM_NUTZUNGSAREAL: 'building-columns',
  address: 'building',
  TLM_NAME_PKT: 'mountain',
  TLM_FLIESSGEWAESSER: 'water',
};

type Props = {
  feature: Feature;
  onPress?: (feature: Feature) => void;
};

export const Address = (props: Props) => {
  const tint = useThemeColor({}, 'tint');

  const filterLabelContent = (properties: GeoJsonProperties) => {
    let parts: string[] = properties?.label
      .split(/(<\/?i>|<\/?b>)/)
      .map((part: string) => part.trim())
      .filter((part: string) => part !== '');

    return parts.slice(parts.lastIndexOf(ICON_TAG_END) + 1).filter((part: string) => !TAG_LIST.includes(part));
  };

  const iconName: string = objectclassIconMappping[props.feature.properties?.objectclass] ?? 'map-pin';
  const labels = filterLabelContent(props.feature.properties);
  const mainLabel = labels[0];
  const subLabel = labels.slice(1).join(' ');
  return (
    <Pressable
      style={styles.container}
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
      onPress={() => props.onPress?.(props.feature)}
    >
      <FontAwesome6 name={iconName} size={24} />
      <View style={{ borderColor: tint, ...styles.textContainer }}>
        {mainLabel ? <Text style={styles.mainText}>{mainLabel}</Text> : null}
        {subLabel ? <Text style={styles.subText}>{subLabel}</Text> : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 25,
    gap: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 5,
    borderBottomWidth: 1,
    padding: 15,
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subText: {
    fontSize: 16,
  },
});
