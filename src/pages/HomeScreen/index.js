import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
    RED,
    WHITE
} from '../../helpers/mainColors';

import {
    MainContainer,
    Text,
    ActionButton,
    Title,
    HeaderContainer,
    BodyContainer,
    FooterContainer,
    HeaderButton
} from '../globalStyle';

export default HomeScreen = ({navigation}) => {
    const user = useSelector(state => state.user);
    let dispatch = useDispatch();

    function logout(){
        dispatch({type:"CLEAR_USER"});
        navigation.popToTop();
    }

    function goToSimulate(){
        if (user.hours == 0 && user.minutes == 0 && user.seconds == 0){
            return Alert.alert(
                "Erro",
                "Configure um tempo para o simulado em Filtro de Materias",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
        dispatch({type:"CLEAR_QUESTIONS"});
        navigation.navigate('Simulate');
    }

    return (
        <MainContainer>
            <HeaderContainer>
                <Title>Menu</Title>
                <HeaderButton
                    onPress={() => navigation.navigate('Plan')}
                >
                    <Icon name="cog" size={30} color={WHITE} />
                </HeaderButton>
            </HeaderContainer>
            <BodyContainer>
                <ActionButton
                    disabled={!user.plan}
                    onPress={() => goToSimulate()}
                >
                    <Text size={18}>Simulado</Text>
                </ActionButton>
                <ActionButton
                    disabled={!user.plan}
                    onPress={() => navigation.navigate('Filter')}
                >
                    <Text size={18}>Filtro de Matérias</Text>
                </ActionButton>
                <ActionButton
                    disabled={!user.plan}
                    onPress={() => navigation.navigate('FavoriteQuestion')}
                >
                    <Text size={18}>Perguntas Favoritadas</Text>
                </ActionButton>
                <ActionButton
                    disabled={!user.plan}
                    onPress={() => navigation.navigate('Statistics')}
                >
                    <Text size={18}>Estatística</Text>
                </ActionButton>
                {user.plan &&
                    <Text size={18} marginTop={50}>Você está utilizando o plano: {user.plan}</Text>
                }
                {!user.plan &&
                    <Text size={18} marginTop={50}>Selecione um plano nas configurações para conseguir acessar a aplicação.</Text>
                }
                <FooterContainer
                    onPress={() => logout()}
                >
                    <Text size={18} color={RED}>Logout</Text>
                </FooterContainer>
            </BodyContainer>
        </MainContainer>
    )
}