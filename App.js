import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native';
import SplashScreen from './Src/Screens/SplashScreen';
import Dashboard from './Src/Screens/Dashboard';
import BooksDetails from './Src/Screens/BooksDetails';
import OpenImages from './Src/Screens/OpenImages';

const Stack = createStackNavigator();

const App = ({params}) => {
  console.disableYellowBox = true;
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <Stack.Navigator initialRouteName={'SplashScreen'}>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BooksDetails"
            component={BooksDetails}
            // options={{headerTitle: 'Category List'}}
          />

          <Stack.Screen
            name="OpenImages"
            component={OpenImages}
            options={{headerTitle: 'Image'}}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
