import { Text, View, useThemeColor } from '@/src/components/Themed';
import { StyleSheet } from 'react-native';

type Props = {
  text: string;
  color: string;
};

export const Tag = (props: Props) => {
  const tint = useThemeColor({}, 'tint');

  const containerStyle = {
    ...styles.container,
    backgroundColor: tint,
  };
  return (
    <View style={containerStyle}>
      <Text style={{ color: props.color, ...styles.tagTextStyle }}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  tagTextStyle: {
    fontWeight: '600',
    fontSize: 14,
  },
});
