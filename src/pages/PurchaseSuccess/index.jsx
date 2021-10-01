import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { IonPage, IonContent } from '@ionic/react';
import {
  AltHeader,
  Divider,
  Margin,
  Typography,
  Navigation,
  Flex,
} from 'moby-ui';

import { MdKeyboardArrowRight } from 'react-icons/md';

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
            TINYTAN JIMIN Character 3D Modeling
            <br />
            상품이 구매 되었습니다.
          </Message>
          <Margin size={71} />

          <Typography size={14} color="#ACACAC">
            <Flex align="center">
              나의 NFT 보러가기 <MdKeyboardArrowRight />
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
