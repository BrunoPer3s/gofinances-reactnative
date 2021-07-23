import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

interface TypeProps {
  type: "income" | "outcome";
}

interface ButtonProps {
  isActived: boolean;
  type: "income" | "outcome";
}

export const Container = styled.View<ButtonProps>`
  width: 48%;
  height: ${RFValue(55)}px;
  border: 1.5px solid rgba(150, 156, 179, 0.2);
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.shape};
  

  ${props => props.isActived && props.type === 'income'  && css`
    background-color: ${(props) => props.theme.colors.success_light};
    border: none;
  `}

  ${props => props.isActived && props.type === 'outcome' && css`
    background-color: ${(props) => props.theme.colors.attention_light};
    border: none;
  `}
`;

export const ButtonContainer = styled(RectButton)`
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(24)}px;
  color: ${(props) =>
    props.type === "income"
      ? props.theme.colors.success
      : props.theme.colors.attention};
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.title};
  font-size: ${RFValue(14)}px;
  font-family: ${(props) => props.theme.fonts.regular};
  margin-left: ${RFValue(10)}px;
`;
