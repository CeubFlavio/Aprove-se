import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';

import {
    RED, YELLOW, CORRECT_COLOR, WRONG_COLOR, GRAY, WHITE
} from '../../helpers/mainColors';
import { translateOptionIndex } from '../../utils/optionHelper';

import {
    MainContainer,
    Text,
    QuestionButton,
    Title,
    HeaderContainer,
    BodyContainer,
    HeaderButton,
    RowBetween,
    Scroll,
    RowButton,
} from '../globalStyle';

export default FavoriteQuestionScreen = ({navigation}) => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [question, setQuestion] = useState(user.favoriteQuestions[currentIndex]);
    const [marked, setMarked] = useState(null);
    const [canShowResult, setCanShowResult] = useState(false);

    function nextQuestion(){
        setMarked(null);
        setCanShowResult(false);
        setCurrentIndex(currentIndex + 1);
    }

    function previousQuestion(){
        setMarked(null);
        setCanShowResult(false);
        setCurrentIndex(currentIndex - 1);
    }

    function hasAction(type){
        if (type == "next"){
            return currentIndex < user.favoriteQuestions.length - 1;
        }else {
            return currentIndex != 0;
        }
    }

    function selectOption(index){
        let translatedOption = translateOptionIndex(index);
        setMarked(translatedOption);

        setCanShowResult(true);
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

    const [isFavorite, setFavorite] = useState(false);

    function toggleFavorite(){
        if (isFavorite){
            dispatch({type: "REMOVE_FAVORITE_QUESTION", payload: {id: currentIndex}});
            setFavorite(false);
        }else{
            if (!user.favoriteQuestions.includes(question.id)){
                dispatch({type: "SET_FAVORITE_QUESTION", payload: {questionData: question}});
            }
            setFavorite(true);
        }
    }

    useEffect(() => {
        (async () => {
            setQuestion(user.favoriteQuestions[currentIndex]);
            setFavorite(true);
        })();
    }, [currentIndex]);

    return (
        <MainContainer>
            <HeaderContainer>
                <HeaderButton
                    onPress={() => navigation.goBack()}
                >
                    <Text size={26} color={RED}>X</Text>
                </HeaderButton>
                <Title>Questões Favoritadas</Title>
            </HeaderContainer>
            <RowBetween marginTop={15}>
                <Text size={16}></Text>
                <RowButton
                    onPress={() => toggleFavorite()}
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
                        <Text size={12}>{currentIndex + 1}/{user.favoriteQuestions.length}</Text>
                        <Text size={12} marginTop={10}>Categorias: {question.categories.toString().replaceAll(",", ", ")}</Text>
                        <Text size={12}>{question.contest}</Text>
                        <Text size={18} align={'justify'} marginTop={30}>{question.question}</Text>
                        {question.text &&
                            <Text size={18} align={'justify'} marginTop={30}>{question.text}</Text>
                        }
                        {question.options.map((option, index) => {
                                return(
                                    <QuestionButton
                                        key={index}
                                        marginTop={20}
                                        bgColor={getBgQuestionColor(index)}
                                        onPress={() => selectOption(index)}
                                        disabled={marked != null}
                                    >
                                        <Text size={14}>{translateOptionIndex(index)}) {option}</Text>
                                    </QuestionButton>
                                )
                            })
                        }
                        <RowBetween
                            marginTop={20}
                        >
                            <RowButton
                                disabled={!hasAction('previous')}
                                onPress={() => previousQuestion()}
                            >
                                {!hasAction('previous') &&
                                    <Text></Text>
                                }
                                {hasAction('previous') &&
                                    <Icon name="arrow-left" size={30} color={WHITE} />
                                }
                            </RowButton>

                            <RowButton
                                disabled={!hasAction('next')}
                                onPress={() => nextQuestion()}
                            >
                                {!hasAction('next') &&
                                    <Text></Text>
                                }
                                {hasAction('next') &&
                                    <Icon name="arrow-right" size={30} color={WHITE} />
                                }
                            </RowButton>
                        </RowBetween>
                    </BodyContainer>
                }
            </Scroll>
        </MainContainer>
    )
}