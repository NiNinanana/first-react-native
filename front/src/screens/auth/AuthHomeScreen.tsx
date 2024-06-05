import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Dimensions, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import CustomButton from '@/components/CustomButton';
import {authNavigations} from '@/constants/navigations';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

const AuthHomeScreen = ({navigation}: AuthHomeScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('@/assets/kirby.png')} />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          label="로그인"
          onPress={() => navigation.navigate(authNavigations.LOGIN)}
        />
        <CustomButton
          label="회원가입"
          onPress={() => navigation.navigate(authNavigations.SIGNUP)}
          variant="outlined"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    width: Dimensions.get('screen').width / 2,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  buttonContainer: {
    flex: 1,
    gap: 10,
    width: '100%',
  },
});

export default AuthHomeScreen;
