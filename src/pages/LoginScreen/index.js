import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from "react-native";

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';

import {
    BLACK,
} from '../../helpers/mainColors';

import {
    MainContainer,
    Title,
    HomeImage,
} from '../globalStyle';
import api from '../../utils/api';

export default LoginScreen = ({navigation}) => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [isLoading, setLoading] = useState(false);

    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        webClientId: '988513532688-40n49cis1a89bp6ms5phq8trc78ml9qb.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        hostedDomain: '', // specifies a hosted domain restriction
        forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        accountName: '', // [Android] specifies an account name on the device that should be used
    });

    async function signIn(){
        try {
            setLoading(true);
            await GoogleSignin.hasPlayServices();
            const USER_INFO = await GoogleSignin.signIn();
            const RESPONSE = await api.post("/google-login", USER_INFO.user);
            setLoading(false);
            if (RESPONSE.data.token){
                dispatch({type: "SET_TOKEN", payload: {token: RESPONSE.data.token}});
                navigation.navigate("Home");
            }
        } catch (error) {
            setLoading(false);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                return Alert.alert(
                    "Erro",
                    "Tentativa de Login cancelada",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                return Alert.alert(
                    "Erro",
                    "O login com o google já está em andamento",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                return Alert.alert(
                    "Erro",
                    "O serviço da Google não está disponível no momento, tente mais tarde.",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            } else {
                // some other error happened
                return Alert.alert(
                    "Erro",
                    "Ocorreu um erro desconhecido, tente novamente mais tarde.",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
        }
    };

    useEffect(()=>{
        if (user.token != ''){
            setTimeout(function(){
                navigation.navigate('Home');
            }, 100);
        }
    }, [])

    return (
        <MainContainer>
            <>
                <Title size={18} color={BLACK}>{user.plan}</Title>
                <HomeImage source={require("../../assets/logo.png")}/>
                <GoogleSigninButton
                    style={{ width: 250, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={signIn}
                    disabled={isLoading}
                />
            </>
        </MainContainer>
    )
}