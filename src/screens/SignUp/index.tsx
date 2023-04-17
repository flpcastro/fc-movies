import { useState } from "react";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";

import { Alert, Text } from "react-native";

import { z } from "zod";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import auth from "@react-native-firebase/auth";
import { Loading } from "@components/Loading";

import { 
  Container, 
  Content, 
  FooterButton, 
  FooterButtonText, 
  FooterContainer, 
  FooterText, 
  FormButtonContainer, 
  FormButtonText, 
  FormContainer, 
  FormInput, 
  InputContainer, 
  Logo 
} from "./styles";


const signUpSchema = z.object({
  email: z.string().nonempty('Informe o e-mail').email('E-mail inválido'),
  senha: z.string().nonempty('Informe a senha').min(6, 'Mínimo de 6 caracteres'),
});

export type FormDataProps = {
  email: string;
  senha: string;
}

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);


  const { COLORS } = useTheme();
  const navigation = useNavigation();

  const { handleSubmit, control, formState: { errors } } = useForm<FormDataProps>({
    resolver: zodResolver(signUpSchema)
  })

  function handleSignUp(data: FormDataProps) {
    setIsLoading(true);
    auth()
    .createUserWithEmailAndPassword(data.email, data.senha)
    .then(() => Alert.alert("Conta", "Cadastrado com sucesso!"))
    .catch((error) => console.log(error))
    .finally(() => setIsLoading(false));
  }

  function handleGoSignIn() {
    navigation.navigate('signIn');
  }

  return (
    <Container>
      <Content>
        <Logo>fC.movies</Logo>

        <FormContainer>
          <InputContainer>
            <Controller 
              control={control}
              name="email"
              render={({ field: { onChange }}) => (
                <FormInput
                  onChangeText={onChange}
                  placeholder="Email"
                  placeholderTextColor={COLORS.GRAY_300}
                  keyboardType="email-address"
                />
              )}
            />
            {errors.email && 
              <Text style={{ 
                color: COLORS.RED_DARK, 
                marginTop: 4
              }}>
                {errors.email.message}
              </Text>
            }
          </InputContainer>

          <InputContainer>
            <Controller 
              control={control}
              name="senha"
              render={({ field: { onChange }}) => (
                <FormInput
                  onChangeText={onChange}
                  placeholder="Senha"
                  placeholderTextColor={COLORS.GRAY_300}
                  secureTextEntry
                />
              )}
            />
            {errors.senha && 
              <Text style={{ 
                color: COLORS.RED_DARK, 
                marginTop: 4
              }}>
                {errors.senha.message}
              </Text>
            }
          </InputContainer>

          <FormButtonContainer 
            onPress={handleSubmit(handleSignUp)}
          >
            { isLoading ? 
              <Loading /> : (
              <FormButtonText>
                Cadastrar
              </FormButtonText>
            )}
          </FormButtonContainer>
        </FormContainer>

        <FooterContainer>
          <FooterText>Já possui conta?</FooterText>
          <FooterButton 
            onPress={handleGoSignIn}
          >
            <FooterButtonText>
              Login
            </FooterButtonText>
          </FooterButton>
        </FooterContainer>
      </Content>
    </Container>
  );
}