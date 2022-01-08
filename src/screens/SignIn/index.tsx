import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from 'react-native';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignInAnonymously() {
    const { user } = await auth().signInAnonymously();
    console.log(user)
  }

  function handleCreateUserAccount() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert('Usuário criado com sucesso!'))
      .catch(error => {
        if(error.code === 'auth/email-already-in-use') {
          Alert.alert('Este e-mail já está em uso.')
        }

        if(error.code === 'auth/invalid-email') {
          Alert.alert('E-mail inválido.')
        }
      })
  }

  function handleSignInWithEmailAndPassword() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => console.log(user))
      .catch(error => {
        if(error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          Alert.alert('Usuário não encontrado. E-mail e/ou senha não encontrados.');
        }
      });
  }

  function handleForgetPassword() {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert('Enviamos um link para redefinir a sua senha.'))
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgetPassword} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}