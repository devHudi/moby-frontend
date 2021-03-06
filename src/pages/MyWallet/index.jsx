import { useState, useCallback } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { IonPage, IonContent, useIonViewWillEnter } from '@ionic/react';
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

import { useRecoilState } from 'recoil';
import { spinnerState } from 'states/spinner';

import * as transactionsApi from 'apis/transactions';
import * as usersApi from 'apis/users';

import NftTab from './components/NftTab';
import PayTab from './components/PayTab';

const MyWallet = () => {
  const history = useHistory();

  const [, setSpinner] = useRecoilState(spinnerState);

  const [tab, setTab] = useState(0);

  const [items, setItems] = useState([]);
  const [balance, setBalance] = useState(0);
  const [cards, setCards] = useState([]);

  const [sort, setSort] = useState(0);

  const jwt = localStorage.getItem('jwt');

  const sortItems = (data, sortType) => {
    if (sortType === 0) {
      return _.sortBy(data, 'date').reverse();
    }

    return _.sortBy(data, 'currentPrice').reverse();
  };

  const getData = useCallback(async () => {
    setSpinner(true);

    const { data: transactionsData } = await transactionsApi.getMyWallet(jwt);
    const { data: userData } = await usersApi.getCurrentUser(jwt);

    console.log({ transactionsData });

    setItems(
      sortItems(
        _.map(transactionsData?.products, (item) => ({
          id: item?.id,
          image: item?.posterSrc,
          name: item?.title,
          date: item?.createdAt,
          buyPrice: item?.purchasePrice,
          currentPrice: item?.currentPrice,
          holding: item?.holdingQuantity,
          holdingPercentage: item?.share,
          onClick: () => history.push(`/items/${item?.id}`),
        })),
        sort,
      ),
    );

    setBalance(userData?.user?.money);

    setCards(
      _.map(userData?.user?.cards, (item) => ({
        name: item?.cardName,
        number: item?.cardNumber,
        expireDate: item?.expired,
      })),
    );

    setSpinner(false);
  }, [setSpinner, jwt, history, sort]);

  useIonViewWillEnter(() => {
    getData();
  });

  return (
    <IonPage>
      <IonContent>
        <Header title="My Wallet">
          <Margin size={10} />
          <Flex justify="space-between">
            <AltTab
              tabs={['?????? NFT', '??????????????????']}
              onChange={(i) => setTab(i)}
            />
            {tab === 0 && (
              <AltDropdown
                items={['???????????????', '???????????????']}
                onChange={(i) => setSort(i)}
              />
            )}
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

        {tab === 1 && <PayTab balance={balance} cards={cards} />}

        <Navigation />
        <Margin size={90} />
      </IonContent>
    </IonPage>
  );
};

export default MyWallet;
