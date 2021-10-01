import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonContent, useIonToast } from '@ionic/react';
import { AltHeader, Divider, Padding, Margin, Typography } from 'moby-ui';

import {
  AiOutlineCreditCard,
  AiOutlineMobile,
  AiOutlineWallet,
} from 'react-icons/ai';

import ItemInfo from './components/ItemInfo';
import Method from './components/Method';
import Price from './components/Price';

const Purchase = () => {
  const history = useHistory();

  const [present, dismiss] = useIonToast();
  const [selected, setSelected] = useState(false);

  const onToast = () => {
    present({
      buttons: [{ text: '확인', handler: () => dismiss() }],
      message: '해당 결제 기능은 추후 제공될 예정입니다.',
    });
  };

  return (
    <IonPage>
      <IonContent>
        <AltHeader title="상품구매" onBackClick={() => history.goBack()} />
        <Divider color="#EFEFEF" weight={6} />

        <Padding padding={25}>
          <Typography size={17} weight="bold">
            상품 내역
          </Typography>

          <Margin size={11} />
          <Divider />
          <Margin size={15} />

          <ItemInfo
            name="TINYTAN JIMIN Character 3D Modeling"
            quantity={2}
            price={180000}
          />
        </Padding>
        <Divider color="#EFEFEF" weight={6} />

        <Padding padding={25}>
          <Typography size={17} weight="bold">
            결제 수단
          </Typography>

          <Margin size={11} />
          <Divider />
          <Margin size={15} />

          <Typography size={15} weight="bold">
            간편결제
          </Typography>
          <Margin size={10} />

          <Method
            mobyPay
            activated={selected}
            balance={21000}
            onClick={() => setSelected(!selected)}
          />
          <Margin size={12} />

          <Typography size={15} weight="bold">
            기타결제
          </Typography>
          <Margin size={10} />

          <Method
            icon={<AiOutlineCreditCard />}
            name="신용카드 결제"
            onClick={onToast}
          />
          <Method
            icon={<AiOutlineMobile />}
            name="휴대폰 결제"
            onClick={onToast}
          />
          <Method
            icon={<AiOutlineWallet />}
            name="무통장입금"
            onClick={onToast}
          />
        </Padding>

        <Price />
        <Margin size={90} />
      </IonContent>
    </IonPage>
  );
};

export default Purchase;
