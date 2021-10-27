import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { IonPage, useIonToast } from '@ionic/react';
import { Flex, LoginTextField, LoginButton, Margin, CheckBox } from 'moby-ui';
import { useForm } from 'hooks';

import { useRecoilState } from 'recoil';
import { spinnerState } from 'states/spinner';

import { auth } from 'apis';

import logoImage from './images/logo.png';

const Gradient = styled.div`
  height: 100%;
  background: linear-gradient(#3b1198, #5000df);
`;

const StyledFlex = styled(Flex)`
  margin: 0 auto;
  width: 233px;
`;

const Logo = styled.img``;

const ButtonWrapper = styled(Flex)`
  height: 45px;
`;

const FindAccount = styled.div`
  color: #ffffff;
  font-size: 14px;
`;

const Login = () => {
  const history = useHistory();

  const [present, dismiss] = useIonToast();

  const [, setSpinner] = useRecoilState(spinnerState);

  const [form, onChange] = useForm({
    email: '',
    password: '',
  });

  const onLogin = async () => {
    setSpinner(true);

    try {
      const { data } = await auth.signIn(form.email, form.password);
      localStorage.setItem('jwt', data.token);
      history.push('/');
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

  const onFind = () => {
    present({
      buttons: [{ text: '확인', handler: () => dismiss() }],
      duration: 2000,
      message: '아직 지원하지 않는 기능입니다.',
    });
  };

  const onJoin = () => {
    history.push('/sign-up');
  };

  return (
    <IonPage>
      <Gradient>
        <StyledFlex
          justify="center"
          align="center"
          direction="column"
          fullHeight
        >
          <Logo src={logoImage} />
          <Margin size={20} />

          <LoginTextField
            type="email"
            placeholder="Email"
            name="email"
            onChange={onChange}
          />
          <Margin size={15} />

          <LoginTextField
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
          />
          <Margin size={20} />

          <ButtonWrapper>
            <LoginButton onClick={onLogin}>LOGIN</LoginButton>
            <Margin size={30} />
            <LoginButton onClick={onJoin}>JOIN</LoginButton>
          </ButtonWrapper>
          <Margin size={15} />

          <CheckBox onClick={onFind}> 로그인 상태 유지</CheckBox>
          <Margin size="150" />

          <FindAccount onClick={onFind}>
            아이디 / 비밀번호 찾기 {'>'}
          </FindAccount>
        </StyledFlex>
      </Gradient>
    </IonPage>
  );
};

export default Login;
