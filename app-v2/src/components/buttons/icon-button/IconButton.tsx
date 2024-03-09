import Colors from '@/src/constants/Colors';
import { PressableStateCallbackType, StyleSheet } from 'react-native';
import { Pressable, PressableProps, useThemeColor } from '../../Themed';

type Props = {
  icon: React.ReactNode;
} & PressableProps;

export const IconButton = (props: Props) => {
  const { icon, style, ...otherProps } = props;
  // const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  //const tint = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');
  if (typeof style === 'function') {
    const styleFn = (state: PressableStateCallbackType) => {
      const styleRes = style(state) as any;
      return {
        ...styleRes,
        ...styles.container,
      };
    };

    return <Pressable style={styleFn} {...otherProps} />;
  }

  return (
    <Pressable style={{ ...(style as any), ...styles.container }} {...otherProps}>
      {icon}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    borderRadius: 50,
    padding: 10,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});
