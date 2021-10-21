import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
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

import * as usersApi from 'apis/users';

import NftTab from './components/NftTab';
import PayTab from './components/PayTab';

const MyWallet = () => {
  const history = useHistory();

  const [tab, setTab] = useState(0);

  const [items, setItems] = useState([]);
  const [cards, setCards] = useState([]);

  const jwt = localStorage.getItem('jwt');

  const getUser = useCallback(async () => {
    const { data } = await usersApi.getCurrentUser(jwt);

    setItems(
      _.map(data.productsPurchased, (item) => ({
        image: item?.posterSrc,
        name: item?.title,
        date: item?.createdAt,
        buyPrice: item?.purchasePrice,
        currentPrice: item?.currentPrice,
        holding: item?.holdingQuantity,
        holdingPercentage: item?.share,
        onClick: () => history.push(`/items/${item?.id}`),
      })),
    );

    setCards(
      _.map(data.cards, (item) => ({
        name: item?.cardName,
        number: item?.cardNumber,
        expireDate: item?.expired,
      })),
    );
  }, [jwt, history]);

  useEffect(() => {
    getUser();
  }, [getUser]);

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
              <NftTab items={items} />
            </Padding>
          </>
        )}

        {tab === 1 && <PayTab cards={cards} />}

        <Navigation />
        <Margin size={90} />
      </IonContent>
    </IonPage>
  );
};

export default MyWallet;
