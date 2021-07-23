import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface AmountProps {
  type: 'income' | 'outcome'
}

export const Container = styled.View`
  margin: 16px 24px;
  padding: ${RFValue(16)}px ${RFValue(24)}px;
  background-color: ${props => props.theme.colors.shape};
  border-radius: 5px;
`;

export const Title = styled.Text`
  font-family: ${props => props.theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${props => props.theme.colors.title};
`;

export const Amount = styled.Text<AmountProps>`
  font-family: ${props => props.theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  color: ${props => props.type === 'income' ? props.theme.colors.success : props.theme.colors.attention}
`;

export const Box = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${RFValue(16)}px;
`;

export const TypeText = styled.Text`
  font-family: ${props => props.theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${props => props.theme.colors.text};
  
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${props => props.theme.colors.text};
  margin-right: ${RFValue(8)}px;
  
`;

export const Date = styled.Text`
  font-family: ${props => props.theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${props => props.theme.colors.text}
`;

export const TypeContainer = styled.View`
  flex-direction: row;
`;
