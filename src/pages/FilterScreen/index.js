import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Switch } from "react-native";

import {
    CORRECT_COLOR,
    RED,
    WHITE,
    WRONG_COLOR,
    BLACK
} from '../../helpers/mainColors';

import {
    MainContainer,
    Text,
    ActionButton,
    Title,
    HeaderContainer,
    BodyContainer,
    HeaderButton,
    ModalContainer,
    ModalView,
    ModalBox,
    ModalInput,
    Row,
    Scroll,
    QuestionButton
} from '../globalStyle';
import api from '../../utils/api';

export default FilterScreen = ({navigation}) => {
    const user = useSelector(state => state.user);
    let dispatch = useDispatch();

    const [visible, setVisible] = useState(false);

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [categories, setCategories] = useState([]);

    function goToFilteredSimulate(){
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
        navigation.navigate('FilteredSimulate');
    }

    function setTime(type, value){
        switch (type){
            case "hours":
                if (value > 23)
                    return Alert.alert(
                        "Erro",
                        "O número máximo de horas permitido é 23",
                        [
                          { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                dispatch({type: "SET_HOURS", payload: {hours: value}});
                break;
            case "minutes":
                if (value > 59)
                    return Alert.alert(
                        "Erro",
                        "O número máximo de minutos permitido é 59",
                        [
                          { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                dispatch({type: "SET_MINUTES", payload: {minutes: value}});
                break;
            case "seconds":
                if (value > 59)
                    return Alert.alert(
                        "Erro",
                        "O número máximo de segundos permitido é 59",
                        [
                          { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                dispatch({type: "SET_SECONDS", payload: {seconds: value}});
                break;
        }
    }

    async function getCategories(){
        api.get("/get-categories", {headers: { 'Authorization': `Bearer ${user.token}`}})
            .then(response => {
                setCategories(response.data.data);
            })
            .catch(error => {
                return Alert.alert(
                    "Erro",
                    "Ocorreu um erro ao carregar as categorias, tente novamente mais tarde.",
                    [
                        { text: "OK", onPress: () => { navigation.navigate("Home"); } }
                    ],
                    {
                        onDismiss: () => { navigation.navigate("Home"); }
                    }
                );
            });
    }

    function isException(categoryId){
        return user.exceptionCategory.includes(categoryId);
    }

    function addException(categoryId){
        if (isException(categoryId)){
            dispatch({type: "REMOVE_CATEGORY_EXCEPTION", payload: {categoryId}})
        }else{
            dispatch({type: "SET_CATEGORY_EXCEPTION", payload: {categoryId}})
        }
    }

    useEffect(() => {
        (async () => {
            getCategories();
        })();
    }, []);

    return (
        <MainContainer>
            <ModalContainer
                visible={visible}
                animationType="fade"
                transparent={true}
                onRequestClose={()=>setVisible(false)}
            >
                <ModalView>
                    <ModalBox>
                        <Text size={18} color={WHITE}>Horas</Text>
                        <ModalInput
                            value={user.hours}
                            onChangeText = {e=>setTime('hours', e)}
                            returnKeyType = "done"
                            keyboardType = 'numeric'
                        />
                        <Text size={18} color={WHITE}>Minutos</Text>
                        <ModalInput
                            value={user.minutes}
                            onChangeText = {e=>setTime('minutes', e)}
                            returnKeyType = "done"
                            keyboardType = 'numeric'
                        />
                        <Text size={18} color={WHITE}>Segundos</Text>
                        <ModalInput
                            value={user.seconds}
                            onChangeText = {e=>setTime('seconds', e)}
                            returnKeyType = "done"
                            keyboardType = 'numeric'
                        />
                         <ActionButton
                            width={30}
                            bgColor={WHITE}
                            onPress={() => setVisible(false)}
                        >
                            <Text size={16} color={BLACK}>Ok</Text>
                        </ActionButton>
                    </ModalBox>
                </ModalView>
            </ModalContainer>

            <HeaderContainer>
                <HeaderButton
                    onPress={() => navigation.goBack()}
                >
                    <Text size={26} color={RED}>X</Text>
                </HeaderButton>
                <Title>Filtro de Matérias</Title>
            </HeaderContainer>
            <BodyContainer>
                <ActionButton
                    marginBottom={10}
                    disabled={true}
                >
                    <Text size={18}>Tempo do Simulado</Text>
                </ActionButton>
                <ActionButton
                    marginBottom={50}
                    width={30}
                    onPress={() => setVisible(true)}
                >
                    <Text size={16}>{user.hours?.toString().padStart(2, "0")}:{user.minutes?.toString().padStart(2, "0")}:{user.seconds?.toString().padStart(2, "0")}</Text>
                </ActionButton>
                <Scroll>
                    {categories.map((category, index) => {
                            return(
                                <QuestionButton
                                    disabled={true}
                                    key={index}
                                    marginTop={20}
                                    minWidth={100}
                                    maxWidth={100}
                                >
                                    <Row
                                        paddingRight={25}
                                    >
                                        <Switch
                                            trackColor={{ false: WRONG_COLOR, true: CORRECT_COLOR }}
                                            thumbColor="#f4f3f4"
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={() => addException(category.id)}
                                            value={!isException(category.id)}
                                        />
                                        <Text size={16} marginLeft={15}>{category.name}</Text>
                                    </Row>
                                </QuestionButton>
                            )
                    })}
                    <ActionButton
                        onPress = {() => goToFilteredSimulate()}
                        bgColor={CORRECT_COLOR}
                        width={30}
                        marginTop={20}
                    >
                        <Text size={18}>Play</Text>
                    </ActionButton>
                </Scroll>
            </BodyContainer>
        </MainContainer>
    )
}