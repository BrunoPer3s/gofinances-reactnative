import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface StyledViewProps {
  color: string;
}

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(48)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  background-color: ${props => props.theme.colors.shape};
  border-radius: 5px;

`;

export const Box = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const StyledView = styled.View<StyledViewProps>`
  height: ${RFValue(48)}px;
  width: 4px;
  background-color: ${props => props.color};
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

export const Title = styled.Text`
  font-family: ${props => props.theme.fonts.regular};
  color: ${props => props.theme.colors.title};
  font-size: ${RFValue(15)}px;
  margin-left: ${RFValue(16)}px;
`;

export const Amount = styled.Text`
  font-family: ${props => props.theme.fonts.bold};
  color: ${props => props.theme.colors.title};
  font-size: ${RFValue(15)}px;
  margin-right: ${RFValue(16)}px;
`;
