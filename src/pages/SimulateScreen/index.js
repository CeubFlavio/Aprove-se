import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useCountdown } from '../../utils/countdownHook.js';
import { Alert } from 'react-native';

import {
    CORRECT_COLOR,
    GRAY,
    RED, WRONG_COLOR, YELLOW
} from '../../helpers/mainColors';

import {
    MainContainer,
    Text,
    ActionButton,
    Title,
    HeaderContainer,
    BodyContainer,
    HeaderButton,
    RowBetween,
    Scroll,
    RowButton,
    QuestionButton,
} from '../globalStyle';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../utils/api.js';
import { translateOptionIndex } from '../../utils/optionHelper.js';

export default SimulateScreen = ({navigation}) => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const [hours, minutes, seconds] = useCountdown(!isLoading);
    const [isFavorite, setFavorite] = useState(false);
    const [canShowResult, setCanShowResult] = useState(false);

    const [question, setQuestion] = useState(null);
    const [marked, setMarked] = useState(null);

    function selectOption(index){
        setLoading(true);
        let translatedOption = translateOptionIndex(index);
        let questionData = question;
        setMarked(translatedOption);
        questionData.marked = translatedOption;
        questionData.markedIndex = index;

        if (isFavorite){
            dispatch({type: "SET_FAVORITE_QUESTION", payload: {questionData}});
        }

        if (translatedOption == question.answer){
            dispatch({type: "SET_CORRECT_QUESTION", payload: {questionData}});
        }else{
            dispatch({type: "SET_WRONG_QUESTION", payload: {questionData}});
        }
        dispatch({type: "COUNT_QUESTION_SOLVED"});

        setCanShowResult(true);

        setTimeout(() => {
            setCanShowResult(false);
            setMarked(null);
            setFavorite(false);
            setQuestion(null);
            getQuestion();
        }, 2000)
    }

    function getBgQuestionColor(optionIndex){
        if (canShowResult){
            let translatedOption = translateOptionIndex(optionIndex);

            if (translatedOption == marked && marked != question.answer){
                return WRONG_COLOR;
            }else if (translatedOption == question.answer){
                return CORRECT_COLOR;
            }else{
                return GRAY;
            }
        }
    }

    async function getQuestion(){
        setLoading(true);
        api.get(`/get-random-question`, {headers: { 'Authorization': `Bearer ${user.token}`}})
            .then(response => {
                setLoading(false);
                setQuestion(response.data.data);
                if (alreadyInFavorite(response.data.data.id)){
                    setFavorite(true);
                }
            })
            .catch(error => {
                console.log(error);
                return Alert.alert(
                    "Erro",
                    "Ocorreu um erro ao carregar as questões, tente novamente mais tarde.",
                    [
                        { text: "OK", onPress: () => { navigation.navigate("Home"); } }
                    ],
                    {
                        onDismiss: () => { navigation.navigate("Home"); }
                    }
                );
            });
    }

    function exit(){
        setLoading(true);
        Alert.alert(
            "Deseja mesmo sair?",
            "Ao sair do simulado seu progesso atual será salvo para visualizar nas estatísticas. Caso queira começar novamente, seu tempo será reiniciado e começará do zero.",
            [
                { text: "Continuar no simulado", onPress: () => { setLoading(false); }, style: "cancel" },
                { text: "OK", onPress: () => { clearHistoryAndGoStatics(); } }
            ],
            {
                cancelable: true,
                onDismiss: () => { setLoading(false) }
            }
        );
    }

    function clearHistoryAndGoStatics(){
        navigation.popToTop();
        navigation.navigate("Home");
        navigation.navigate("Statistics")
    }

    function alreadyInFavorite(id){
        return user.favoriteQuestions.includes(id);
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            getQuestion();
        })();
    }, []);

    return (
        <MainContainer>
            <HeaderContainer>
                <HeaderButton
                    onPress={() => exit()}
                >
                    <Text size={26} color={RED}>X</Text>
                </HeaderButton>
                <Title>Simulado</Title>
            </HeaderContainer>
            <RowBetween marginTop={15}>
                <Text size={16}>{`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</Text>
                <RowButton
                    onPress={() => setFavorite(!isFavorite)}
                >
                    {isFavorite &&
                        <Icon name="star" size={30} color={YELLOW} />
                    }
                    {!isFavorite &&
                        <Icon name="star-o" size={30} color={YELLOW} />
                    }
                </RowButton>
            </RowBetween>
            <Scroll>
                {question &&
                    <BodyContainer>
                        <Text size={12}>Categorias: {question.categories.toString().replaceAll(",", ", ")}</Text>
                        <Text size={12}>{question.contest}</Text>
                        <Text size={18} align={'justify'} marginTop={30}>{question.question}</Text>
                        {question.text &&
                            <Text size={18} align={'justify'} marginTop={30}>{question.text}</Text>
                        }
                        {question.options.map((option, index) => {
                                return(
                                    <QuestionButton
                                        key={index}
                                        bgColor={getBgQuestionColor(index)}
                                        onPress={() => selectOption(index)}
                                        marginTop={20}
                                        disabled={marked != null}
                                    >
                                        <Text size={14}>{translateOptionIndex(index)}) {option}</Text>
                                    </QuestionButton>
                                )
                            })
                        }
                    </BodyContainer>
                }
            </Scroll>
        </MainContainer>
    )
}