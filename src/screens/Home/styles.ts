import { Platform, StatusBar } from "react-native";
import styled from "styled-components/native";

const isAndroid = Platform.OS === "android";

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const Content = styled.View`
  padding: 0 24px 24px 24px;
  flex: 1;
`

export const NoResultText = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.COLORS.GRAY_200};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  margin-top: 14px;
`;

export const FlatListContainer = styled.View`
  margin-top: 24px;
  gap: 24px;
`;

export const MovieListEmptyText = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  text-align: center;
`;