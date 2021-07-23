import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(RectButton).attrs({
  opacity: .7
})`
  height: ${RFValue(56)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: ${props => props.theme.colors.shape};
  margin-top: ${RFValue(16)}px;
  border-radius: 5px;
`;

export const Category = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: ${RFValue(14)}px;
  font-family: ${props => props.theme.fonts.regular};
`;

export const Icon = styled(Feather)`
  color: ${props => props.theme.colors.text};
  font-size: ${RFValue(20)}px;
`;