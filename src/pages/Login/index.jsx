import styled from 'styled-components';
import { IonPage } from '@ionic/react';
import { Flex, LoginTextField, LoginButton, Margin, CheckBox } from 'moby-ui';

import logoImage from './images/logo.png';

const Gradient = styled.div`
  height: 100%;
  background: linear-gradient(#3b1198, #5000df);
`;

const StyledFlex = styled(Flex)`
  margin: 0 auto;
  width: 280px;
`;

const Logo = styled.img``;

const ButtonWrapper = styled(Flex)`
  height: 45px;
`;

const FindAccount = styled.div`
  color: #ffffff;
`;

const Login = () => (
  <>
    <Gradient>
      <StyledFlex justify="center" align="center" direction="column" fullHeight>
        <Logo src={logoImage} />
        <Margin size={20} />

        <LoginTextField placeholder="ID" />
        <Margin size={15} />

        <LoginTextField placeholder="Password" />
        <Margin size={20} />

        <ButtonWrapper>
          <LoginButton>LOGIN</LoginButton>
          <Margin />
          <LoginButton>JOIN</LoginButton>
        </ButtonWrapper>
        <Margin size="15" />

        <CheckBox> 로그인 상태 유지</CheckBox>
        <Margin size="150" />

        <FindAccount>아이디 / 비밀번호 찾기 {'>'}</FindAccount>
      </StyledFlex>
    </Gradient>
  </>
);

export default Login;
