import styled from 'styled-components/native';
import { Platform, StatusBar, FlatList } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { DataListProps } from '.';


export const Container = styled.View`
  flex: 1;
  background-color:  ${props => props.theme.colors.background};

`;

export const Header = styled.View`
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() : StatusBar.currentHeight}px;
  width: 100%;
  height: ${RFPercentage(42)}px;
  background-color: ${props => props.theme.colors.primary};
  align-items: center;
  
`;

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;

  border-radius: 10px;
`;

export const GreetingsText = styled.Text`
  margin-left: 16px;
  color: ${props => props.theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${props => props.theme.fonts.regular};
  justify-content: center;
  
`;

export const NameText = styled.Text`
  color: ${props => props.theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${props => props.theme.fonts.bold};
`;

export const LogoutButton = styled(BorderlessButton)``;

export const Icon = styled(Feather)`
  color: ${props => props.theme.colors.secondary};
  font-size: ${ RFValue(26)}px;
`;

export const CardsContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 }
})`
  position: absolute;
  margin-top: ${RFValue(110)}px;

`;

export const ListText = styled.Text`
  font-family: ${props => props.theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  margin-top: ${RFValue(90)}px;
  margin-bottom: ${RFValue(10)}px;
  padding: 0 24px;
  color: ${props => props.theme.colors.title_dark}
`;

export const TrasanctionList = styled(FlatList as new () => FlatList<DataListProps>).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace()
  }
})``;

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
