import { Pressable, Text } from '@/src/components/Themed';
import { PressableProps, StyleSheet } from 'react-native';

interface Props extends PressableProps {
  icon?: React.ReactNode;
  title: string;
}

export const TintButton = (props: Props) => {
  const { icon, title, ...otherProps } = props;

  return (
    <Pressable style={(pressed) => (pressed ? styles.container : null)} {...otherProps}>
      {icon ?? null}
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 5,
    gap: 10,
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});
