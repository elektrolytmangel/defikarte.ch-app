import { Pressable, Text } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';
import { PressableProps, StyleSheet } from 'react-native';

interface Props extends PressableProps {
  icon?: React.ReactNode;
  title: string;
}

export const TextButton = (props: Props) => {
  const { icon, title, style, ...otherProps } = props;

  const containerStyle = { ...(style as any), ...styles.container };
  return (
    <Pressable style={(pressed) => (pressed ? containerStyle : containerStyle)} {...otherProps}>
      {icon ?? null}
      <Text style={styles.text} lightColor={Colors.light.primaryColor} darkColor={Colors.dark.primaryColor}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});
