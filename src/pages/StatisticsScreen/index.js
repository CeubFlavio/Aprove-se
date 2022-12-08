import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { PieChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from 'react-redux';

import {
    CORRECT_COLOR,
    RED,
    WRONG_COLOR
} from '../../helpers/mainColors';

import api from '../../utils/api';

import {
    MainContainer,
    Text,
    ActionButton,
    QuestionButton,
    Title,
    HeaderContainer,
    BodyContainer,
    HeaderButton,
    Column,
    Row,
    RowBetween,
    BlackHole,
    Scroll
} from '../globalStyle';

export default StatisticsScreen = ({navigation}) => {
    const user = useSelector(state => state.user);

    const [categories, setCategories] = useState([]);

    const chartConfig = {
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        useShadowColorFromDataset: false // optional
    };

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

    function getCategoryChartData(categoryName){
        let wrongQuestions = user.wrongQuestions.filter(question => question.categories.includes(categoryName)).length;
        let correctQuestions = user.correctQuestions.filter(question => question.categories.includes(categoryName)).length;
        return data = [
            {
                name: "Corretas",
                value: correctQuestions,
                color: CORRECT_COLOR,
            },
            {
                name: "Erradas",
                value: wrongQuestions,
                color: WRONG_COLOR,
            },
        ];
    }

    function getQuestionNumbers(type, categoryName){
        if (type == 'wrong'){
            return user.wrongQuestions.filter(question => question.categories.includes(categoryName)).length;
        }else{
            return user.correctQuestions.filter(question => question.categories.includes(categoryName)).length;
        }
    }

    function hasQuestionInCategory(categoryName){
        return user.wrongQuestions.filter(question => question.categories.includes(categoryName)).length > 0 ||
                user.correctQuestions.filter(question => question.categories.includes(categoryName)).length > 0;
    }

    useEffect(() => {
        (async () => {
            getCategories();
        })();
    }, []);

    return (
        <MainContainer>
            <HeaderContainer>
                <HeaderButton
                    onPress={() => navigation.goBack()}
                >
                    <Text size={26} color={RED}>X</Text>
                </HeaderButton>
                <Title>Estatística</Title>
            </HeaderContainer>
            <BodyContainer>
                <Text size={14}>Perguntas Resolvidas: {user.questionsSolved ?? 0}</Text>
                <Text size={14}>{user.hours.toString().padStart(2, "0")}:{user.minutes.toString().padStart(2, "0")}:{user.seconds.toString().padStart(2, "0")}</Text>
                <ActionButton
                    onPress={() => navigation.navigate('WrongQuestions')}
                >
                    <Text size={18}>Perguntas Erradas</Text>
                </ActionButton>
                <Scroll>
                    {categories.map((category, index) => {
                        if (hasQuestionInCategory(category.name)){
                            return(
                                <RowBetween
                                    key={index}
                                >
                                    <Column
                                        width={70}
                                    >
                                        <QuestionButton
                                            onPress={() => ""}
                                            disabled={true}
                                            minWidth={100}
                                            maxWidth={100}
                                            marginTop={0}
                                            marginBottom={10}
                                        >
                                            <Text size={16}>{category.name}</Text>
                                        </QuestionButton>
                                        <Row
                                            key={index + 1}
                                        >
                                            <Text size={13} color={WRONG_COLOR}>Erradas<Text>: {getQuestionNumbers('wrong', category.name)}</Text></Text>
                                            <Text size={13} color={CORRECT_COLOR}>Certas<Text>: {getQuestionNumbers('correct', category.name)}</Text></Text>
                                        </Row>
                                    </Column>
                                    <PieChart
                                        data={getCategoryChartData(category.name)}
                                        width={100}
                                        height={100}
                                        chartConfig={chartConfig}
                                        accessor={"value"}
                                        backgroundColor={"transparent"}
                                        center={[25, 0]}
                                        hasLegend={false}
                                    />
                                    <BlackHole />
                                </RowBetween>
                            )
                        }
                    })}
                </Scroll>
            </BodyContainer>
        </MainContainer>
    )
}