import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Main from './pages/Main';
import PostOccurrence from './pages/PostOccurrence';
import Occurrence from './pages/Occurrence';
import { StatusBar } from 'react-native';

export default function Routes() {
    return (
        <NavigationContainer>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#642484"
            />
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Main" component={Main} />
                <AppStack.Screen name="Occurrence" component={Occurrence} />
                <AppStack.Screen name="PostOccurrence" component={PostOccurrence} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}