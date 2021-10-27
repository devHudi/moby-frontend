import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { IonPage, useIonToast } from '@ionic/react';
import {
  Flex,
  Margin,
  TextField,
  Button,
  AltHeader,
  Padding,
  Typography,
} from 'moby-ui';

import { useRecoilState } from 'recoil';
import { spinnerState } from 'states/spinner';

import { useForm } from 'hooks';

import { auth } from 'apis';

import backgroundImage from './images/background.png';
import logoImage from './images/logo.png';

const Background = styled.div`
  height: 100%;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: bottom;
  background-color: #ffffff;
`;

const Logo = styled.img`
  width: 25px;
`;

const SignUp = () => {
  const history = useHistory();

  const [form, onChange, reset] = useForm({
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const [present, dismiss] = useIonToast();

  const [, setSpinner] = useRecoilState(spinnerState);

  const onSignUp = async () => {
    const { username, phoneNumber, email, password } = form;

    setSpinner(true);

    try {
      await auth.signUp(username, phoneNumber, email, password);

      present({
        buttons: [{ text: '확인', handler: () => dismiss() }],
        duration: 2000,
        message: '회원가입에 성공하였습니다.',
      });

      history.push('/login');

      reset();
    } catch (error) {
      const { message } = error.response.data;

      present({
        buttons: [{ text: '확인', handler: () => dismiss() }],
        duration: 2000,
        message: Array.isArray(message) ? message[0] : message,
      });
    }

    setSpinner(false);
  };

  return (
    <IonPage>
      <Background>
        <Padding padding={0} left={33} right={33}>
          <AltHeader
            title={<Logo src={logoImage} />}
            onBackClick={() => history.goBack()}
          />
        </Padding>

        <Padding padding={0} left={51} right={51}>
          <Flex align="center" direction="column" fullHeight>
            <Margin size={10} />

            <Typography size={20} weight="bold">
              Create an account
            </Typography>
            <Margin size={60} />

            <TextField
              placeholder="NAME"
              underline
              name="username"
              onChange={onChange}
            />
            <Margin size={20} />

            <TextField
              type="tel"
              placeholder="PHONE"
              underline
              name="phoneNumber"
              onChange={onChange}
            />
            <Margin size={20} />

            <TextField
              type="email"
              placeholder="EMAIL"
              underline
              name="email"
              onChange={onChange}
            />
            <Margin size={20} />

            <TextField
              type="password"
              placeholder="PASSWORD"
              underline
              name="password"
              onChange={onChange}
            />
            <Margin size={50} />

            <Flex justify="flex-end">
              <Button width={78} onClick={onSignUp}>
                JOIN
              </Button>
            </Flex>
          </Flex>
        </Padding>
      </Background>
    </IonPage>
  );
};

export default SignUp;
