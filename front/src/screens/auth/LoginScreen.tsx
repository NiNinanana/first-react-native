import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import useForm from '@/hooks/useForm';
import {validateLogin} from '@/utils';
import useAuth from '@/query/auth';

const LoginScreen = () => {
  const passwordRef = useRef<TextInput>(null);

  const {loginMutation} = useAuth();

  const {getTextInputProps, values} = useForm({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validateLogin,
  });

  const handleSubmit = () => {
    loginMutation.mutate(values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          secureTextEntry
          returnKeyType="join"
          onSubmitEditing={handleSubmit}
          blurOnSubmit={false}
          {...getTextInputProps('password')}
        />
      </View>
      <CustomButton label="로그인" onPress={handleSubmit} />
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

export default LoginScreen;
