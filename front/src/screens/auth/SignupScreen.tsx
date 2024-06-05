import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import useForm from '@/hooks/useForm';
import {validateSignup} from '@/utils';
import useAuth from '@/query/auth';

interface SignupScreenProps {}

const SignupScreen = ({}: SignupScreenProps) => {
  const passwordRef = useRef<TextInput>(null);
  const passwordConfirmRef = useRef<TextInput>(null);

  const {signupMutation, loginMutation} = useAuth();

  const {getTextInputProps, values} = useForm({
    initialValue: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validateSignup,
  });

  const handleSubmit = () => {
    const {email, password} = values;

    signupMutation.mutate(values, {
      onSuccess: () => loginMutation.mutate({email, password}),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          autoFocus
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          textContentType="oneTimeCode"
          secureTextEntry
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          {...getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          secureTextEntry
          returnKeyType="join"
          onSubmitEditing={handleSubmit}
          {...getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton label="회원가입" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default SignupScreen;
