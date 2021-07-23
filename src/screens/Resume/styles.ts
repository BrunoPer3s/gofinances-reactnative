import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler'

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const Main = styled.View`
  flex: 1;
  margin: ${RFValue(30)}px ${RFValue(24)}px ${RFValue(30)}px;
  align-items: center;
  justify-content: center;
`;

export const ChartContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: ${RFValue(245)}px;
  margin-top: ${RFValue(32)}px;
  height: ${RFValue(245)}px;
`;

export const CardsContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false
})`
  width: 100%;
  margin-top: ${RFValue(40)}px;
`;

export const NoDataText = styled.Text``;

export const MonthText = styled.Text`
  font-family: ${props => props.theme.fonts.regular};
  color: ${props => props.theme.colors.title_dark};
  font-size: ${RFValue(20)}px;
`;

export const MonthSelect = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const MonthSelectButton = styled(BorderlessButton)`
  align-items: center;
  justify-content: center;
  padding: ${RFValue(12)}px;
  
`;

export const MonthSelectIcon = styled(AntDesign)`
  font-size: ${RFValue(24)}px;
`;