import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Title, Icon, ButtonContainer } from "./styles";

interface ButtonProps extends RectButtonProps {
  type: "income" | "outcome";
  isActived: boolean;
}

export function Button({ type , isActived,...rest}: ButtonProps) {
  return (
    <Container isActived={isActived} type={type}>
      <ButtonContainer {...rest}>
        <Icon
          type={type}
          name={type === "income" ? "arrow-up-circle" : "arrow-down-circle"}
        />
        <Title>{type === "income" ? "Income" : "Outcome"}</Title>
      </ButtonContainer>
    </Container>
  );
}
