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
import { useForm } from 'hooks';

import * as usersApi from 'apis/users';

import backgroundImage from './images/background.png';
import logoImage from './images/logo.png';

const Background = styled.div`
  height: 100%;
  background-color: #ffffff;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: bottom;
`;

const Logo = styled.img`
  width: 25px;
`;

const Label = styled.div`
  width: 100%;
  font-size: 11px;
  font-weight: bold;
`;

const AddCard = () => {
  const history = useHistory();

  const [form, onChange, reset] = useForm({
    cardNumber: '',
    expiredDate: '',
    cvc: '',
  });

  const [present, dismiss] = useIonToast();

  const jwt = localStorage.getItem('jwt');

  const onSubmit = async () => {
    const { cardNumber, expiredDate, cvc } = form;

    if (!cardNumber || !expiredDate || !cvc) {
      present({
        buttons: [{ text: '확인', handler: () => dismiss() }],
        duration: 2000,
        message: '모든 정보를 입력해주세요.',
      });
    }

    try {
      await usersApi.appendCard(cardNumber, jwt);

      present({
        buttons: [{ text: '확인', handler: () => dismiss() }],
        duration: 2000,
        message: '카드 등록에 성공하였습니다.',
      });

      history.push('/my-wallet');

      reset();
    } catch (error) {
      const { message } = error.response.data;

      present({
        buttons: [{ text: '확인', handler: () => dismiss() }],
        duration: 2000,
        message: Array.isArray(message) ? message[0] : message,
      });
    }
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
              Card Information
            </Typography>
            <Margin size={10} />

            <Margin size={60} />

            <Label> CARD NUMBER </Label>
            <TextField
              type="number"
              placeholder="카드 번호 6자리"
              underline
              name="cardNumber"
              maxLength={6}
              onChange={onChange}
            />
            <Margin size={10} />

            <Typography size={11} weight="light" color="#adb5bd" width="100%">
              입력받은 6자리의 번호로 가상 카드 번호를 생성합니다.
            </Typography>
            <Margin size={20} />

            <Label> EXPIRED DATE </Label>
            <TextField
              type="number"
              placeholder="MMYY"
              underline
              name="expiredDate"
              maxLength={4}
              onChange={onChange}
            />
            <Margin size={20} />

            <Label> CVC </Label>
            <TextField
              type="number"
              placeholder="CVC"
              underline
              name="cvc"
              maxLength={3}
              onChange={onChange}
            />
            <Margin size={50} />

            <Flex justify="flex-end">
              <Button width={78} onClick={onSubmit}>
                OK
              </Button>
            </Flex>
          </Flex>
        </Padding>
      </Background>
    </IonPage>
  );
};

export default AddCard;
