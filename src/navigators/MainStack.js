import React from 'react';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';

import LoginScreen from '../pages/LoginScreen';
import HomeScreen from '../pages/HomeScreen';
import SimulateScreen from '../pages/SimulateScreen';
import FavoriteQuestionScreen from '../pages/FavoriteQuestionScreen';
import StatisticsScreen from '../pages/StatisticsScreen';
import WrongQuestionsScreen from '../pages/WrongQuestionsScreen';
import PlanScreen from '../pages/PlanScreen';
import FilterScreen from '../pages/FilterScreen';
import FilteredSimulateScreen from '../pages/FilteredSimulateScreen';

const MainStack = createNativeStackNavigator();

export default () => {
    return(
        <MainStack.Navigator screenOptions={{
            headerShown:false
        }}>
            <MainStack.Screen name="Login" component={LoginScreen}/>
            <MainStack.Screen name="Home" component={HomeScreen}/>
            <MainStack.Screen name="Simulate" component={SimulateScreen}/>
            <MainStack.Screen name="FavoriteQuestion" component={FavoriteQuestionScreen}/>
            <MainStack.Screen name="Statistics" component={StatisticsScreen}/>
            <MainStack.Screen name="WrongQuestions" component={WrongQuestionsScreen}/>
            <MainStack.Screen name="Plan" component={PlanScreen}/>
            <MainStack.Screen name="Filter" component={FilterScreen}/>
            <MainStack.Screen name="FilteredSimulate" component={FilteredSimulateScreen}/>
        </MainStack.Navigator>
    );
}