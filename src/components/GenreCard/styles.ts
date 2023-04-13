import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  width: 114px;
  height: 36px;
  border-radius: 5px;
  background: ${({ theme }) => theme.COLORS.GREEN_700};
  padding: 8px;
  
  align-items: center;
  justify-content: center;
  margin-left: 5px;
`;

export const GenreName = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE };
`;