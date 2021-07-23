import styled from 'styled-components/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1; 
  background-color: ${props => props.theme.colors.primary};
`;

export const Content = styled.View`
  height: 100%;
  margin-top: ${StatusBar.currentHeight}px ;
  padding-top: ${RFValue(50)}px; 
`;

export const FooterContainer = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${props => props.theme.colors.secondary};
  padding: 0 ${RFValue(32)}px;
  margin-top: ${RFValue(80)}px;
`;

export const FooterContent = styled.View`
  margin-top: ${RFValue(-40)}px;
`;

export const LogoContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: ${RFValue(45)}px;
`;

export const Title = styled.Text`
  font-family: ${props => props.theme.fonts.regular};
  color: ${props => props.theme.colors.shape};
  font-size: ${RFValue(30)}px;
  line-height: ${RFValue(40)}px;
  text-align: center;
`;

export const SubTitle = styled.Text`
 font-family: ${props => props.theme.fonts.regular};
  color: ${props => props.theme.colors.shape};
  font-size: ${RFValue(16)}px;
  margin-top: ${RFValue(80)}px;
  text-align: center;
`;