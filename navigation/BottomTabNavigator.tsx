import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Pressable, Text } from 'react-native';
import { Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { PortfolioScreen } from '../screens/PortfolioScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Portfolio"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint,
        showLabel:false,
        style:{ padding:0, alignItems:'center', justifyContent:'center', height:60, backgroundColor:'#1F1D2B', borderTopWidth:0}}}>
      <BottomTab.Screen
        name="Watchlist"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="eye" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="List"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Portfolio"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart" color={color} />,
        }}
      />
      
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1F1D2B",
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      }}
    >
      <TabOneStack.Screen
        name="Watchlist"
        component={TabOneScreen}
        options={{ headerTitle: 'Your Crypto' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#1F1D2B",
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }}
    >
      <TabTwoStack.Screen
        name="Portfolio"
        component={TabTwoScreen}
        options={{ headerTitle: '' }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator();

function TabThreeNavigator() {
  return (
    <TabTwoStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#1F1D2B",
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }}
    >
      <TabTwoStack.Screen
        name="List"
        component={PortfolioScreen}
        options={{ headerTitle: 'Portfolio',
         }}
      />
    </TabTwoStack.Navigator>
  );
}
