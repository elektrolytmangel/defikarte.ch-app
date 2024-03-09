/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView, TextInput as DefaultTextInput } from 'react-native';
import DefaultBottomSheet, {
  BottomSheetTextInput as DefaultBottomSheetTextInput,
  BottomSheetProps as DefaultBottomSheetProps,
} from '@gorhom/bottom-sheet';
import Colors from '@/src/constants/Colors';
import { useColorScheme } from './useColorScheme';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props'];
export type BottomSheetProps = ThemeProps & DefaultBottomSheetProps & React.RefAttributes<BottomSheetMethods>;
export type BottomSheetTextInputProps = ThemeProps & any;

export function useThemeColor(props: { light?: string; dark?: string }, colorName: keyof typeof Colors.light & keyof typeof Colors.dark) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
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

export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const onSurface = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');

  return <DefaultTextInput style={[{ backgroundColor: onSurface, padding: 10, borderRadius: 10 }, style]} {...otherProps} />;
}

export function BottomSheetTextInput(props: BottomSheetTextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const onSurface = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');

  return <DefaultBottomSheetTextInput style={[{ backgroundColor: onSurface, padding: 10, borderRadius: 10 }, style]} {...otherProps} />;
}

export const BottomSheet = (props: BottomSheetProps) => {
  const { style, handleStyle, handleIndicatorStyle, backgroundStyle, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const onSurface = useThemeColor({ light: lightColor, dark: darkColor }, 'onSurface');

  return (
    <DefaultBottomSheet
      handleIndicatorStyle={[{ backgroundColor: onSurface }, handleIndicatorStyle]}
      backgroundStyle={[{ backgroundColor }, backgroundStyle]}
      {...otherProps}
    />
  );
};
