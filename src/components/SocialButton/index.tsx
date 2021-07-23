import React from "react";
import { ActivityIndicator } from "react-native";

import GoogleSvg from "../../assets/google.svg";
import AppleSvg from "../../assets/apple.svg";

import { Container, Title } from "./styles";
import { RectButtonProps } from "react-native-gesture-handler";
import theme from "../../global/styles/theme";

type SocialButtonProps = RectButtonProps & {
  type: "Google" | "Apple";
  loading: boolean;
};

export function SocialButton({ type, loading, ...rest }: SocialButtonProps) {
  return (
    <Container {...rest}>
      {loading ? (
        <ActivityIndicator color={theme.colors.title} size="small" />
      ) : (
        <>
          {type === "Apple" ? <AppleSvg /> : <GoogleSvg />}
          <Title>Entrar com {type}</Title>
        </>
      )}
    </Container>
  );
}
