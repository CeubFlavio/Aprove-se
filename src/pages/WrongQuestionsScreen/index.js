import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

import {
    CORRECT_COLOR,
    GRAY,
    RED, WHITE, WRONG_COLOR, YELLOW
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
    QuestionButton
} from '../globalStyle';
import { translateOptionIndex } from '../../utils/optionHelper.js';

export default WrongQuestionsScreen = ({navigation}) => {
    const user = useSelector(state => state.user);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [question, setQuestion] = useState(user.wrongQuestions[currentIndex]);

    function nextQuestion(){
        setCurrentIndex(currentIndex + 1);
    }

    function previousQuestion(){
        setCurrentIndex(currentIndex - 1);
    }

    function hasAction(type){
        if (type == "next"){
            return currentIndex < user.wrongQuestions.length - 1;
        }else {
            return currentIndex != 0;
        }
    }

    function getBgQuestionColor(optionIndex){
        let translatedOption = translateOptionIndex(optionIndex);

        if (translatedOption == question.marked && question.marked != question.answer){
            return WRONG_COLOR;
        }else if (question.marked == question.answer || translatedOption == question.answer){
            return CORRECT_COLOR;
        }else{
            return GRAY;
        }
    }

    useEffect(() => {
        (async () => {
            setQuestion(user.wrongQuestions[currentIndex]);
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
                <Title>Questões Erradas</Title>
            </HeaderContainer>
            <Scroll>
                {question &&
                    <BodyContainer>
                        <Text size={12}>{currentIndex + 1}/{user.wrongQuestions.length}</Text>
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
                                        disable={true}
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