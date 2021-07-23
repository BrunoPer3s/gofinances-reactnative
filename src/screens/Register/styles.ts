import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const Content = styled.View`
  flex: 1;
  margin: ${RFValue(24)}px;
  justify-content: space-between;
`;

export const Form = styled.View``;

export const Box = styled.View`
  margin-top: 6px;
  flex-direction: row;
  justify-content: space-between;
`;

