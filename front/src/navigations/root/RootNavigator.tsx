import React from 'react';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import useAuth from '@/query/auth';

interface RootNavigatorProps {}

const RootNavigator = ({}: RootNavigatorProps) => {
  const {isLogin} = useAuth();

  return isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />;
};

export default RootNavigator;
