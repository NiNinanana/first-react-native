import CustomButton from '@/components/CustomButton';
import useAuth from '@/query/auth';
import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

interface FeedHomeScreenProps {}

const FeedHomeScreen = ({}: FeedHomeScreenProps) => {
  const {logoutMutation} = useAuth();

  return (
    <SafeAreaView>
      <Text>피드</Text>
      <CustomButton
        label="로그아웃"
        onPress={() => logoutMutation.mutate(null)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default FeedHomeScreen;
