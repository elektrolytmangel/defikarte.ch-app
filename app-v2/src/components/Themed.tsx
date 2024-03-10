/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import Colors from '@/src/constants/Colors';
import { FontAwesome6 as DefaultFontAwesome6 } from '@expo/vector-icons';
import DefaultBottomSheet, {
  BottomSheetProps as DefaultBottomSheetProps,
  BottomSheetTextInput as DefaultBottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { ForwardedRef, forwardRef } from 'react';
import {
  Pressable as DefaultPressable,
  PressableProps as DefaultPressableProps,
  ScrollView as DefaultScrollView,
  Text as DefaultText,
  TextInput as DefaultTextInput,
  View as DefaultView,
  PressableStateCallbackType,
} from 'react-native';
import { useColorScheme } from './useColorScheme';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type PressableProps = ThemeProps & DefaultPressableProps;
export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type ScrollViewProps = ThemeProps & DefaultScrollView['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props'];
export type BottomSheetProps = ThemeProps & DefaultBottomSheetProps & React.RefAttributes<BottomSheetMethods>;
export type BottomSheetTextInputProps = ThemeProps & any;
export type FontAwesome6Props = ThemeProps & any;

export function useThemeColor(props: { light?: string; dark?: string }, colorName: keyof typeof Colors.light & keyof typeof Colors.dark) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];
  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Pressable(props: PressableProps) {
  const { lightColor, darkColor, style, ...otherProps } = props;
  const tint = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');
  const background = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  if (typeof style === 'function') {
    const styleFn = (state: PressableStateCallbackType) => {
      const styleRes = style(state) as any;
      return {
        backgroundColor: state.pressed ? background : tint,
        ...styleRes,
      };
    };

    return <DefaultPressable style={styleFn} {...otherProps} />;
  }

  return <DefaultPressable style={[{ backgroundColor: tint }, style]} {...otherProps} />;
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function ScrollView(props: ScrollViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultScrollView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const onSurface = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultTextInput style={[{ backgroundColor: onSurface, color, padding: 10, borderRadius: 10 }, style]} {...otherProps} />;
}

export function BottomSheetTextInput(props: BottomSheetTextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const onSurface = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <DefaultBottomSheetTextInput style={[{ backgroundColor: onSurface, color, padding: 10, borderRadius: 10 }, style]} {...otherProps} />
  );
}

export const BottomSheet = forwardRef((props: BottomSheetProps, ref: ForwardedRef<BottomSheetMethods>) => {
  const { style, handleStyle, handleIndicatorStyle, backgroundStyle, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const tint = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');

  return (
    <DefaultBottomSheet
      ref={ref}
      handleIndicatorStyle={[{ backgroundColor: tint }, handleIndicatorStyle]}
      backgroundStyle={[{ backgroundColor }, backgroundStyle]}
      {...otherProps}
    />
  );
});

export const FontAwesome6 = (props: FontAwesome6Props) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultFontAwesome6 style={[{ color }, style]} {...otherProps} />;
};
