import { CaretLeft, ShareNetwork, Trash } from "phosphor-react-native";
import { Platform, StatusBar } from "react-native";
import styled, { css } from "styled-components/native";

const isAndroid = Platform.OS === "android";

export const Main = styled.SafeAreaView`
  flex: 1;
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
  background: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const Container = styled.View`
  align-items: center;
  min-height: 100%;
  padding: 0 24px 24px 24px;
`;

export const TitleContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 25px;
  margin-bottom: 25px;
`;

export const BackIcon = styled(CaretLeft).attrs(( { theme }) => ({
  size: 32,
  color: theme.COLORS.GREEN_500,
}))``;

export const TrashIcon = styled(Trash).attrs(( { theme }) => ({
  size: 32,
  color: theme.COLORS.GREEN_500,
}))``;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`;
