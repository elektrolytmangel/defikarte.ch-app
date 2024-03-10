import { Pressable, PressableProps, useThemeColor } from '@/src/components/Themed';
import { PressableStateCallbackType, StyleSheet, View } from 'react-native';

type Props = {
  icon: React.ReactNode;
  size?: 'normal' | 'large';
} & PressableProps;

export const IconButton = (props: Props) => {
  const { icon, style, ...otherProps } = props;
  const background = useThemeColor({}, 'background');
  const backgroundActive = useThemeColor({}, 'tint');

  const size = props.size === 'large' ? 60 : 48;
  const styleFn = (state: PressableStateCallbackType) => {
    const styleRes = typeof style === 'function' ? (style(state) as any) : style;
    return {
      ...styleRes,
      ...styles.container,
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: state.pressed ? backgroundActive : background,
    };
  };

  return (
    <View style={styles.borderStyle}>
      <Pressable style={styleFn} {...otherProps}>
        {icon}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderStyle: {
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});
