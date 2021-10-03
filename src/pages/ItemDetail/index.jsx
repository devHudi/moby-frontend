import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonContent } from '@ionic/react';
import { Divider, Image, Padding, Margin, Tab, AltHeader } from 'moby-ui';

import { useRecoilState } from 'recoil';
import { cartState } from 'states/cart';

import Header from './components/Header';
import ChartTab from './components/ChartTab';
import DetailTab from './components/DetailTab';
import Purchase from './components/Purchase';

const DUMMY_IMAGES = [
  'https://4.bp.blogspot.com/-Wyiw25y1ROM/XItG89ClSmI/AAAAAAAAH5k/HkWAY6oIkSAgATE7kPyfcm4dbliJnUDygCLcBGAs/s1600/tw_year_01.jpg',
  'https://2.bp.blogspot.com/-P2g_UukmG-I/XItG8w5xNrI/AAAAAAAAH5o/Q6UXFhQi7mA2WYbHHQqU2yuL7B2llMoDACLcBGAs/s1600/tw_year_02.jpg',
];

const ItemDetail = () => {
  const history = useHistory();

  const [tab, setTab] = useState(0);
  const [cart, setCart] = useRecoilState(cartState); // eslint-disable-line

  const onTabChange = (i) => {
    setTab(i);
  };

  const onBuy = (itemId, quantity, totalPrice) => {
    history.push('/purchase');
    setCart({
      itemId,
      quantity,
      totalPrice,
    });
  };

  const onSell = (itemId, quantity, totalPrice) => {
    // selling logic here
    console.log(`${itemId}, ${quantity} 개를 총 ${totalPrice} 원 에 판매`);
  };

  return (
    <IonPage>
      <IonContent>
        <AltHeader
          title="BTS Butter Poster"
          subtitle="Cooler Remix | Sweeter Remix"
          onBackClick={() => history.goBack()}
        />

        <Image
          height={237}
          image="https://www.idolsale.com/web/product/medium/201812/b922d46f9808c416145c7beec3be9e51.jpg"
        />
        <Header price={150000} stock={2300} total={10000} />
        <Divider />
        <Padding>
          <Tab tabs={['CHART', 'DETAIL']} onChange={onTabChange} />

          <Margin size={17} />

          {tab === 0 && <ChartTab />}
          {tab === 1 && <DetailTab images={DUMMY_IMAGES} />}
        </Padding>

        <Purchase
          type="official" // official or community
          defaultBuyPrice={1234}
          defaultSellPrice={4321}
          onBuy={onBuy}
          onSell={onSell}
        />
        <Margin size={90} />
      </IonContent>
    </IonPage>
  );
};

export default ItemDetail;
