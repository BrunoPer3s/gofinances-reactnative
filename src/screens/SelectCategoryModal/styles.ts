import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';

interface ColoredViewProps {
  backgroundColor?: string;
  isActive?: boolean;
}

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const Category = styled(RectButton)<ColoredViewProps>`
  height: ${RFValue(56)}px;
  background-color: ${props => props.isActive ? props.backgroundColor : props.theme.colors.shape};
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  margin: 0 ${RFValue(16)}px ${RFValue(16)}px;
`;

export const ColoredView = styled.View<ColoredViewProps>`
  height: 100%;
  width: 4px;
  background-color: ${props => props.backgroundColor};
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  
`;

export const Icon = styled(Feather)<ColoredViewProps>`
  font-size: ${RFValue(20)}px;
  margin-left: 20px;
  color: ${props => props.theme.colors.title_dark}
  
  ${props => props.isActive && css`
    color: ${props => props.theme.colors.shape}
  `}
`;

export const Name = styled.Text<ColoredViewProps>`
  font-family: ${props => props.theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  margin-left: 16px;
  color: ${props => props.theme.colors.title_dark};

  ${props => props.isActive && css`
    color: ${props => props.theme.colors.shape}
  `}
`;

export const ListContainer = styled.View`
  height: 100%;
  margin-top: 24px;
`;

export const SubmitButton = styled(RectButton)`
  height: ${RFValue(55)}px;
  margin: auto 16px 16px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 5px;
`;

export const SubmitButtonText = styled.Text`
  color: ${props => props.theme.colors.shape};
  font-size: ${RFValue(14)}px;
  font-family: ${props => props.theme.fonts.medium};
`;

