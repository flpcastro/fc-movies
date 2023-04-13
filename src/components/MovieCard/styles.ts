import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  width: 120px;
  height: 145px;
  border-radius: 5px;
  margin: 0 5px 10px 5px;
  background: ${({ theme }) => theme.COLORS.GRAY_500};
`;

export const MovieImage = styled.Image`
  width: 120px;
  height: 145px;
  border-radius: 5px;
`;