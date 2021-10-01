import { useState } from 'react';
import _ from 'lodash';
import { IonPage, IonContent } from '@ionic/react';
import {
  Header,
  Divider,
  AltTab,
  Image,
  Typography,
  Margin,
  Padding,
  Flex,
  Navigation,
} from 'moby-ui';

import NftTab from './components/NftTab';
import PayTab from './components/PayTab';

const dummyItems = [
  {
    image: 'http://placehold.it/300x300',
    name: 'TINYTAN JIMIN 3D Modeling',
    date: new Date(),
    buyPrice: 90000,
    currentPrice: 90000,
    holding: 2,
    holdingPercentage: 0.05,
    onClick: () => {},
  },
  {
    image: 'http://placehold.it/300x300',
    name: 'TINYTAN JIMIN 3D Modeling',
    date: new Date(),
    buyPrice: 90000,
    currentPrice: 90000,
    holding: 2,
    holdingPercentage: 0.05,
    onClick: () => {},
  },
  {
    image: 'http://placehold.it/300x300',
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
    image: 'http://placehold.it/300x300',
    name: '신한카드 Z',
    number: '9999-9999-9999-9999',
    expireDate: new Date(),
  },
  {
    image: 'http://placehold.it/300x300',
    name: '삼성카드 와우',
    number: '9999-9999-9999-9999',
    expireDate: new Date(),
  },
  {
    image: 'http://placehold.it/300x300',
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
          <AltTab
            tabs={['나의 NFT', '간편결제수단']}
            onChange={(i) => setTab(i)}
          />
          <Margin size={3} />
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
