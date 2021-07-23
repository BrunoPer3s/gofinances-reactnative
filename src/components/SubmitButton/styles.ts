import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(RectButton)`
  height: ${RFValue(55)}px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 5px;
`;

export const Title = styled.Text`
  color: ${props => props.theme.colors.shape};
  font-size: ${RFValue(14)}px;
  font-family: ${props => props.theme.fonts.medium};
`;