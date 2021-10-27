import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { IonPage, IonContent, useIonViewWillEnter } from '@ionic/react';
import {
  AltHeader,
  Divider,
  Margin,
  Typography,
  Navigation,
  Flex,
} from 'moby-ui';

import { MdKeyboardArrowRight } from 'react-icons/md';

import * as transactionApis from 'apis/transactions';

import checkIcon from './images/check.png';

const Body = styled(Flex)`
  height: calc(100% - 199px);
`;

const Message = styled(Typography)`
  max-width: 260px;
  letter-spacing: -1px;
`;

const PurchaseSuccess = () => {
  const history = useHistory();
  const { id } = useParams();
  const jwt = localStorage.getItem('jwt');

  const [transaction, setTransaction] = useState({});

  const getTransaction = useCallback(async () => {
    const { data } = await transactionApis.getTransaction(id, jwt);
    setTransaction(data);
  }, [id, jwt]);

  useIonViewWillEnter(() => {
    getTransaction();
  });

  return (
    <IonPage>
      <IonContent>
        <AltHeader title="상품구매" onBackClick={() => history.goBack()} />
        <Divider color="#EFEFEF" weight={6} />

        <Body direction="column" justify="center" align="center">
          <Typography color="#7334E4" size={25} weight="bold">
            Completed
          </Typography>
          <Margin size={30} />

          <img src={checkIcon} />
          <Margin size={44} />

          <Message color="#7334E4" size={15} align="center">
            {transaction?.product?.title}
            <br />
            상품이 구매 되었습니다.
          </Message>
          <Margin size={71} />

          <Typography
            size={14}
            color="#ACACAC"
            onClick={() => history.push('/my-wallet')}
          >
            <Flex align="center">
              나의 NFT 보러가기 <MdKeyboardArrowRight />
            </Flex>
          </Typography>

          <Margin size={20} />

          <Typography
            size={14}
            color="#ACACAC"
            onClick={() => {
              if (transaction) window.open(transaction?.url);
            }}
          >
            <Flex align="center">
              Etherscan 에서 거래내역 확인하기 <MdKeyboardArrowRight />
            </Flex>
          </Typography>
        </Body>

        <Navigation />
        <Margin size={90} />
      </IonContent>
    </IonPage>
  );
};

export default PurchaseSuccess;
