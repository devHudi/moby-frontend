import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { IonPage } from '@ionic/react';
import {
  Flex,
  Margin,
  TextField,
  Button,
  AltHeader,
  Padding,
  Typography,
} from 'moby-ui';

import backgroundImage from './images/background.png';
import logoImage from './images/logo.png';

const Background = styled.div`
  height: 100%;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: bottom;
`;

const Logo = styled.img`
  width: 25px;
`;

const SignUp = () => {
  const history = useHistory();

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

            <TextField placeholder="NAME" underline />
            <Margin size={20} />

            <TextField placeholder="PHONE" underline />
            <Margin size={20} />

            <TextField
              keyboardType="email-address"
              placeholder="EMAIL"
              underline
            />
            <Margin size={20} />

            <TextField type="password" placeholder="PASSWORD" underline />
            <Margin size={50} />

            <Flex justify="flex-end">
              <Button width={78}>JOIN</Button>
            </Flex>
          </Flex>
        </Padding>
      </Background>
    </IonPage>
  );
};

export default SignUp;
