import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Main from './pages/Main';
import PostOccurrence from './pages/PostOccurrence';
import Occurrence from './pages/Occurrence';

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>  
                <AppStack.Screen name="Main" component={Main} />
                <AppStack.Screen name="Occurrence" component={Occurrence} />
                <AppStack.Screen name="PostOccurrence" component={PostOccurrence} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}