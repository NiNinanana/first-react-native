import React from 'react';
import {
  Dimensions,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
} from 'react-native';
import {colors} from '../constants';

interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: 'filled' | 'outlined';
  size?: 'large' | 'medium';
  invalid?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;

const CustomButton = ({
  label,
  variant = 'filled',
  size = 'large',
  invalid = false,
  ...props
}: CustomButtonProps) => {
  return (
    <Pressable
      disabled={invalid}
      style={({pressed}) => [
        styles.container,
        styles[size],
        invalid && styles.invalid,
        pressed ? styles[`${variant}Pressed`] : styles[variant],
      ]}
      {...props}>
      <Text style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    justifyContent: 'center',
  },
  invalid: {
    opacity: 0.5,
  },
  filled: {
    backgroundColor: colors.PINK_700,
  },
  outlined: {
    borderColor: colors.PINK_700,
    borderWidth: 1,
  },
  filledPressed: {
    backgroundColor: colors.PINK_500,
  },
  outlinedPressed: {
    borderColor: colors.PINK_700,
    borderWidth: 1,
    opacity: 0.5,
  },
  medium: {
    width: '50%',
    paddingVertical: deviceHeight > 700 ? 15 : 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  large: {
    width: '100%',
    paddingVertical: deviceHeight > 700 ? 12 : 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 600,
  },
  filledText: {
    color: colors.WHITE,
  },
  outlinedText: {
    color: colors.PINK_700,
  },
});

export default CustomButton;
