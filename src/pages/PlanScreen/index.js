import React from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from "react-native";

import {
    RED
} from '../../helpers/mainColors';

import {
    MainContainer,
    Text,
    ActionButton,
    Title,
    HeaderContainer,
    BodyContainer,
    HeaderButton,
    Scroll,
} from '../globalStyle';

export default PlanScreen = ({navigation}) => {
    const dispatch = useDispatch();

    function setPlan(plan){
        dispatch({type: "SET_PLAN", payload: {plan}});
        Alert.alert(
            "Sucesso",
            "Seu plano foi escolhido com sucesso",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
    }

    return (
        <MainContainer>
            <HeaderContainer>
                <HeaderButton
                    onPress={() => navigation.goBack()}
                >
                    <Text size={26} color={RED}>X</Text>
                </HeaderButton>
                <Title>Opções de Pagamento</Title>
            </HeaderContainer>
            <Scroll>
                <BodyContainer>
                    <ActionButton
                        onPress={() => setPlan("Mensal")}
                    >
                        <Text size={18}>Mensal - R$ 34,99</Text>
                    </ActionButton>
                    <ActionButton
                        onPress={() => setPlan("Semestral")}
                    >
                        <Text size={18}>Semestral - R$ 174,99</Text>
                    </ActionButton>
                    <ActionButton
                        onPress={() => setPlan("Anual")}
                    >
                        <Text size={18}>Anual - R$ 349,99</Text>
                    </ActionButton>
                </BodyContainer>
            </Scroll>
        </MainContainer>
    )
}