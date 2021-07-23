import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

interface TypeProps {
  type?: string;
}

export const Container = styled.View<TypeProps>`
  position: relative;
  width: ${RFValue(300)}px;
  background-color: ${(props) =>
    props.type === "total"
      ? props.theme.colors.secondary
      : props.theme.colors.shape};
  padding: ${RFValue(20)}px ${RFValue(24)}px;
  border-radius: 5px;
  margin-right: 16px;
`;

export const Title = styled.Text<TypeProps>`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${(props) =>
    props.type === "total"
      ? props.theme.colors.shape
      : props.theme.colors.title};
`;

export const AmountText = styled.Text<TypeProps>`
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${(props) =>
    props.type === "total"
      ? props.theme.colors.shape
      : props.theme.colors.title};
  margin-top: ${RFValue(55)}px;
`;

export const LastTransactionText = styled.Text<TypeProps>`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: #969cb3;
  color: ${(props) =>
    props.type === "total"
      ? props.theme.colors.shape
      : props.theme.colors.text};
`;

export const Icon = styled(Feather)<TypeProps>`
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: ${RFValue(40)}px;
  color: ${({ theme }) => theme.colors.shape};

  ${props => props.type === 'income' && css`
    color: ${({ theme }) => theme.colors.success}
  `}

  ${props => props.type === 'outcome' && css`
    color: ${({ theme }) => theme.colors.attention}
  `}

 
`;
