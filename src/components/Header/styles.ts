import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface ContainerProps {
  modal: boolean;
}

export const Container = styled.View<ContainerProps>`
  background-color: ${props => props.theme.colors.primary};
  align-items: center;

  ${props => props.modal && css`
    padding-top: ${StatusBar.currentHeight}px;
  `}
`;

export const Title = styled.Text`
  color: ${props => props.theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${props => props.theme.fonts.regular};
  padding-top: ${RFValue(35)}px;
  padding-bottom: ${RFValue(20)}px;
`;