import { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import {
  Header,
  Divider,
  Flex,
  AltTab,
  Margin,
  Padding,
  Navigation,
  AltDropdown,
} from 'moby-ui';

import NftTab from './components/NftTab';
import PayTab from './components/PayTab';

const dummyItems = [
  {
    image: 'https://picsum.photos/300/300',
    name: 'TINYTAN JIMIN 3D Modeling',
    date: new Date(),
    buyPrice: 90000,
    currentPrice: 90000,
    holding: 2,
    holdingPercentage: 0.05,
    onClick: () => {},
  },
  {
    image: 'https://picsum.photos/300/300',
    name: 'TINYTAN JIMIN 3D Modeling',
    date: new Date(),
    buyPrice: 90000,
    currentPrice: 90000,
    holding: 2,
    holdingPercentage: 0.05,
    onClick: () => {},
  },
  {
    image: 'https://picsum.photos/300/300',
    name: 'TINYTAN JIMIN 3D Modeling',
    date: new Date(),
    buyPrice: 90000,
    currentPrice: 90000,
    holding: 2,
    holdingPercentage: 0.05,
    onClick: () => {},
  },
];

const dummyCars = [
  {
    image: 'https://picsum.photos/300/300',
    name: '신한카드 Z',
    number: '9999-9999-9999-9999',
    expireDate: new Date(),
  },
  {
    image: 'https://picsum.photos/300/300',
    name: '삼성카드 와우',
    number: '9999-9999-9999-9999',
    expireDate: new Date(),
  },
  {
    image: 'https://picsum.photos/300/300',
    name: 'BC카드 킹',
    number: '9999-9999-9999-9999',
    expireDate: new Date(),
  },
];

const MyWallet = () => {
  const [tab, setTab] = useState(0);

  return (
    <IonPage>
      <IonContent>
        <Header title="My Wallet">
          <Margin size={10} />
          <Flex justify="space-between">
            <AltTab
              tabs={['나의 NFT', '간편결제수단']}
              onChange={(i) => setTab(i)}
            />
            {tab === 0 && <AltDropdown items={['구매순', '가격순']} />}
          </Flex>
        </Header>

        {tab === 0 && (
          <>
            <Divider weight={6} color="#EFEFEF" />
            <Padding padding={26}>
              <NftTab items={dummyItems} />
            </Padding>
          </>
        )}

        {tab === 1 && <PayTab cards={dummyCars} />}

        <Navigation />
        <Margin size={90} />
      </IonContent>
    </IonPage>
  );
};

export default MyWallet;
