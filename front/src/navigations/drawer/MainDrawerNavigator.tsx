import React from 'react';

import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MapStackNavigator, {MapStackParamList} from '../stack/MapStackNavigator';
import {mainNavigations} from '@/constants';
import {NavigatorScreenParams} from '@react-navigation/native';

export type MainDrawerParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigations.FEED]: undefined;
  [mainNavigations.CALENDAR]: undefined;
};

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
      }}>
      <Drawer.Screen
        name="MapHome"
        component={MapStackNavigator}
        options={{title: '홈'}}
      />
      <Drawer.Screen
        name="FeedHome"
        component={FeedHomeScreen}
        options={{title: '피드'}}
      />
      <Drawer.Screen
        name="CalendarHome"
        component={CalendarHomeScreen}
        options={{title: '캘린더'}}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
