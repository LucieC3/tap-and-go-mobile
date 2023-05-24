import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from './ui/screens/MapScreen';
import StationsListScreen from './ui/screens/StationsListScreen';

type RootTabParamList = {
  MapScreen: undefined;
  StationsList: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen name="StationsList" component={StationsListScreen} />
        <Tab.Screen name="MapScreen" component={MapScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
