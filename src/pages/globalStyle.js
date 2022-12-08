import styled from 'styled-components';

import {
    BLACK,
    GRAY,
    WHITE,
    BLUE,
} from '../helpers/mainColors';

export const Scroll = styled.ScrollView.attrs(()=>({
    contentContainerStyle: {
        paddingBottom: 95,
        alignItems: 'center'
    },
    showsVerticalScrollIndicator: false
}))
`
    width: 100%;
    height: 100%;
    align-self: flex-start;
`

//CONTAINERS
export const MainContainer = styled.SafeAreaView`
    flex: 1;
    padding: 5px 20px;
    justify-content: flex-start;
    align-items: center;
    background-color: ${BLACK};
    min-heigth: 100%;
`;

export const HeaderContainer = styled.View`
    width: 90%
    padding: 10px;
    border-bottom-width: 1px;
    border-bottom-color: ${GRAY};
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
`;

export const BodyContainer = styled.View`
    padding: 10px;
    margin-top: 30px;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 100%;
`;

export const RowBetween = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-width: ${props => props.width ? props.width : 100}%;
    max-width: 100%;
    margin-top: ${props => props.marginTop ? props.marginTop : 0}px;
`;

export const Row = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    min-width: ${props => props.width ? props.width : 100}%;
    max-width: 100%;
`;

export const Column = styled.View`
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    min-width: ${props => props.width ? props.width : 100}%;
    max-width: 100%;
`;

export const FooterContainer = styled.TouchableOpacity`
    margin-top: 50px;
    justify-content: flex-end;
    align-items: flex-end;
    align-self: flex-end;
    padding: 10px;
    position: relative;
`;

export const BlackHole = styled.View`
    width: 40px;
    height: 40px;
    border-radius: 40px;
    background-color: ${BLACK};
    position: absolute;
    right: 30px;
`;

export const HomeImage = styled.Image`
    width: 360px;
    height: 312px;
    margin-top: 88px;
`;

export const GoogleImage = styled.Image`
    width: 20px;
    height: 22px;
    margin-top: 10px;
`;

export const ModalContainer = styled.Modal``;

export const ModalView = styled.View`
   width: 100%;
   height: 100%;
   background-color: rgba(0,0,0, 0.5);
   justify-content: center;
   align-items: center;
 `;

export const ModalBox = styled.View`
    padding: 30px 0;
    background-color: ${GRAY};
    width: 80%;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
`;

export const ModalInput = styled.TextInput.attrs(()=>({
    placeholderTextColor: GRAY,
}))`
   flex-direction: row;
   text-align: center;
   align-items: center;
   justify-content: center;
   background-color: #fff;
   height: 40px;
   width: 80%;
   border-radius: 10px;
   margin-top: 10px;
   margin-bottom: 20px;
   font-size: 12px;
   border-bottom-width: 1px;
   border-bottom-color: #9C9C9C;
   color: ${GRAY};
 `;

export const ModalRow = styled.View`
    margin-top: 5px;
    height: 40px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 90%;
`;

//TEXTS
export const Title = styled.Text`
    font-size: 22px;
    color: ${WHITE};
    width: 90%;
    text-align: center;
`;

export const Text = styled.Text`
    font-size: ${props => props.size ? props.size : 12}px;
    color: ${props => props.color ? props.color : WHITE};
    text-align: ${props => props.align ? props.align : 'left'};
    margin-left: ${props => props.marginLeft ? props.marginLeft : 0}px;
    margin-top: ${props => props.marginTop ? props.marginTop : 0}px;
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : 0}px;
`;

//BUTTONS
export const ActionButton = styled.TouchableHighlight.attrs(()=>({
    activeOpacity: 0.6,
    underlayColor: BLUE
}))`
    background-color: ${props => props.bgColor ? props.bgColor : GRAY};
    min-width: ${props => props.width ? props.width : 70}%;
    height: ${props => props.height ? props.height : 70}px;
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : 30}px;
    margin-top: ${props => props.marginTop ? props.marginTop : 10}px;
    color: ${WHITE};
    border-radius: 10px;
    padding: ${props => props.paddingVertical ? props.paddingVertical : 10}px ${props => props.paddingHorizontal ? props.paddingHorizontal : 25}px;
    justify-content: center;
    align-items: center;
`;

export const QuestionButton = styled.TouchableHighlight.attrs(()=>({
    activeOpacity: 0.6,
    underlayColor: BLUE
}))`
    background-color: ${props => props.bgColor ? props.bgColor : GRAY};
    min-width: ${props => props.minWidth ? props.minWidth : 80}%;
    max-width: ${props => props.maxWidth ? props.maxWidth : 80}%;
    height: auto;
    margin-top: ${props => props.marginTop ? props.marginTop : 0}px;
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : 0}px;
    color: ${WHITE};
    border-radius: 10px;
    padding: ${props => props.paddingVertical ? props.paddingVertical : 10}px ${props => props.paddingHorizontal ? props.paddingHorizontal : 25}px;
    justify-content: center;
    align-items: center;
`;

export const HeaderButton = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    float: left;
    align-items: center;
    justify-content: center;
`;

export const RowButton = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    align-items: center;
    justify-content: center;
`;