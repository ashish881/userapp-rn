import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';
import UserList from '../screens/UsersList';
import BookmarksList from '../screens/BookmarkList';

const Tab = createBottomTabNavigator();

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'UserList':
      iconName = 'dashboard';
      break;
    case 'BookmarksList':
      iconName = 'bookmark';
      break;
    default:
      break;
  }

  return <Icon name={iconName} color={color} size={24} />;
};

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="UserList"
        screenOptions={({route}) => ({
          tabBarActiveTintColor: 'green',
          tabBarIcon: ({color}) => screenOptions(route, color),
        })}>
        <Tab.Screen
          name="UserList"
          component={UserList}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="BookmarksList"
          component={BookmarksList}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
