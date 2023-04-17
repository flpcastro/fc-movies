import { Platform, StatusBar } from "react-native";
import styled, { css } from "styled-components/native";

const isAndroid = Platform.OS === "android";

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const Content = styled.View`
  padding: 0 24px 24px 24px;
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const Logo = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GREEN_500};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.XL}px;
  `}
`;

export const FormContainer = styled.View`
  gap: 15px;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`;

export const FormButtonContainer = styled.TouchableOpacity`
  background: ${({ theme }) => theme.COLORS.GREEN_500};
  width: 140px;
  align-items: center;
  justify-content: center;
  max-height: 34px;
  min-height: 34px;
  border-radius: 5px;
`

export const FormButtonText = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`

export const InputContainer = styled.View``;

export const FormInput = styled.TextInput`
  ${({ theme }) => css`
    background: ${theme.COLORS.GRAY_500};
    color: ${theme.COLORS.WHITE};
  `}

  width: 250px;
  max-height: 48px;
  min-height: 48px;
  border-radius: 5px;
  padding: 14px;
`;

export const GoToSignUpContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`;

export const GoToSignUpText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_300};
    font-size: ${theme.FONT_SIZE.MD}px;
  `}
`;

export const GoToSignUpButton = styled.TouchableOpacity`
  margin-top: 8px;
`;

export const GoToSignUpButtonText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GREEN_500};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.MD}px;
  `}
`;
