import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from "./ui/screens/MapScreen";
import StationsListScreen from "./ui/screens/StationsListScreen";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import StationDetailsScreen from "./ui/screens/StationDetailsScreen";

type RootTabParamList = {
  Carte: undefined;
  Stations: undefined;
};

export type RootStackParamList = {
  StationsListScreen: undefined;
  StationDetailsScreen: { stationId: string };
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Stations" component={StackScreen} />
        <Tab.Screen name="Carte" component={MapScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const StackScreen: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StationsListScreen"
        component={StationsListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StationDetailsScreen"
        component={StationDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default App;
