import React from 'react';
import {APP_COLOR} from '../Utils/Theme';
import AddToRead from './AddToRead';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BookFilter from './BookFilter';
import Books from './Books';

const Dashboard = ({params}) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: APP_COLOR.appColor,
        inactiveTintColor: APP_COLOR.black,
        labelStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen
        name="Books"
        component={Books}
        options={{
          tabBarLabel: 'Books',
        }}
      />
      <Tab.Screen
        name="BookFilter"
        component={BookFilter}
        options={{
          tabBarLabel: 'Filter',
        }}
      />
      <Tab.Screen
        name="AddToRead"
        component={AddToRead}
        options={{
          tabBarLabel: 'Your Read List',
        }}
      />
    </Tab.Navigator>
  );
};

export default Dashboard;
