import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";

export const Container = styled(TextInput)`
  ${({ theme }) => css`
    background-color: ${theme.COLORS.GRAY_500};
    color: ${theme.COLORS.GRAY_200};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
  `}

  flex: 1;

  min-height: 46px;
  max-height: 46px;

  border-radius: 6px;
  padding: 16px;

  margin-top: 22px;
`