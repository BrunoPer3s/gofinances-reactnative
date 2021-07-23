import React, { useState } from "react";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { SocialButton } from "../../components/SocialButton";
import LogoSvg from "../../assets/logo.svg";

import {
  Container,
  Content,
  FooterContainer,
  SubTitle,
  Title,
  FooterContent,
  LogoContainer,
} from "./styles";
import { useAuth } from "../../hooks/UseAuth";

export function SignIn() {
  
  const { signInWithGoogle, signInWithApple, isGoogleLoading, isAppleLoading } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      return await signInWithGoogle();
    } catch (err) {
      console.log(err);
      Alert.alert("Não foi possível conectar a conta Google");
    }
  }

  async function handleSignInWithApple() {
    try {
      return await signInWithApple();
    } catch (err) {
      console.log(err);
      Alert.alert("Não foi possível conectar a conta Apple");
    }
  }

  return (
    <Container>
      <Content>
        <LogoContainer>
          <LogoSvg width={RFValue(120)} height={RFValue(70)} />
        </LogoContainer>
        <Title>
          Controle suas{"\n"}finanças de forma{"\n"}muito simples
        </Title>
        <SubTitle>Faça seu login com{"\n"}uma das contas abaixo</SubTitle>
        <FooterContainer>
          <FooterContent>
            <SocialButton
              type="Google"
              onPress={handleSignInWithGoogle}
              loading={isGoogleLoading}
            />
            {Platform.OS === "ios" && (
              <SocialButton
                type="Apple"
                onPress={handleSignInWithApple}
                loading={isAppleLoading}
              />
            )}
          </FooterContent>
        </FooterContainer>
      </Content>
    </Container>
  );
}
