import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { TextInput } from 'react-native';

export const Container = styled(TextInput)`
  width: 100%;
  height: ${RFValue(55)}px;
  padding: 0 16px;

  margin-bottom: ${RFValue(10)}px;

  background-color: ${props => props.theme.colors.shape};
  color: ${props => props.theme.colors.title_dark};
  font-family: ${props => props.theme.fonts.regular};
  border-radius: 5px;
  font-size: ${RFValue(14)}px;
`;