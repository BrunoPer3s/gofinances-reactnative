import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(RectButton)`
  width: 100%;
  height: ${RFValue(56)}px;
  background-color: ${props => props.theme.colors.shape};
  border-radius: 5px;
  margin-bottom: ${RFValue(16)}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const Title = styled.Text`
  font-family: ${props => props.theme.fonts.regular};
  color: ${props => props.theme.colors.title};
  font-size: ${RFValue(14)}px;
  margin-left: ${RFValue(18)}px;
`;