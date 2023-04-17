import { CaretLeft, ShareNetwork } from "phosphor-react-native";
import { Platform, StatusBar } from "react-native";
import styled, { css } from "styled-components/native";

const isAndroid = Platform.OS === "android";

export const Main = styled.SafeAreaView`
  flex: 1;
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
  background: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const BackIcon = styled(CaretLeft).attrs(( { theme }) => ({
  size: 32,
  color: theme.COLORS.GREEN_500,
}))``;

export const Container = styled.View`
  align-items: center;
  min-height: 100%;
  padding: 0 24px 24px 24px;
`;

export const Poster = styled.Image`
  height: 300px;
  width: 200px;
`;

export const TitleContent = styled.View`
  width: 100%;
  height: 30px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  gap: 8px;
`;

export const MovieTitle = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.LG}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.WHITE};
  `}
  
  max-width: 80%;
`;

export const MovieRating = styled.View`
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

export const RateAndFavoriteContainer = styled.View`
  flex-direction: row;
  gap: 13px;
  align-items: center;
  justify-content: space-between;
`;

export const RatingText = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XL}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.GREEN_700};
  `}
`;

export const MovieGenres = styled.View`
  flex-direction: row;
  margin-top: 25px;
  align-items: center;
  justify-content: space-around;
`;

export const Genre = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    background: ${theme.COLORS.GREEN_700};
    color: ${theme.COLORS.WHITE};
  `}
  padding: 3px;
  margin-right: 12px;
`;

export const OverviewText = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}

  margin-top: 25px;  
  text-align: justify;
`;

export const Infos = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 35px;
`;

export const InfoContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const InfoTitle = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.WHITE};
  `}
`;

export const InfoContent = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_200};
`;

export const ShareIcon = styled(ShareNetwork).attrs(( { theme }) => ({
  size: 28,
  color: theme.COLORS.GREEN_500,
}))``;