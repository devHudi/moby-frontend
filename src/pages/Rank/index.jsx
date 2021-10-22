import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { IonPage, IonContent } from '@ionic/react';
import { AltHeader, Divider, Padding, Margin, Navigation } from 'moby-ui';

import * as productsApi from 'apis/products';

import Item from './components/Item';

const dummyRanks = Array.from(Array(10)).map((item, i) => ({
  rank: i + 1,
  name: `상품 ${i + 1}`,
  status: 2,
  isNew: true,
  image: 'https://picsum.photos/300/300',
  sales: 10912342,
  likes: 12341234,
  clicks: 2394829,
}));

const Rank = () => {
  const history = useHistory();

  const [ranking, setRanking] = useState([]);

  const getRanking = useCallback(async () => {
    const jwt = localStorage.getItem('jwt');
    const { data } = await productsApi.getProductsWithRakings(10, 1, jwt);

    console.log(data);

    const isNews = [
      true,
      false,
      false,
      true,
      true,
      false,
      false,
      true,
      false,
      false,
    ];
    const statuses = [2, 2, 0, 2, 1, 2, 0, 0, 0, 1];

    setRanking(
      _.map(data.products, (item, i) => ({
        rank: i + 1,
        name: item?.title,
        status: statuses[i],
        isNew: isNews[i],
        image: item?.posterSrc,
        sales: 0,
        likes: item?.likesCount,
        clicks: 0,
        onClick: () => history.push('/rank'),
      })),
    );
  }, [history]);

  useEffect(() => {
    getRanking();
  }, [getRanking]);

  return (
    <IonPage>
      <IonContent>
        <AltHeader
          title="실시간 NFT 순위"
          onBackClick={() => history.goBack()}
        />
        <Divider />

        <Padding padding={30} top={21}>
          {_.map(ranking, (item) => (
            <Item
              key={item.rank}
              rank={item.rank}
              name={item.name}
              status={item.status}
              isNew={item.isNew}
              image={item.image}
              sales={item.sales}
              likes={item.likes}
              clicks={item.clicks}
              defaultOpen={item.rank < 4}
              onClick={() => history.push('/items/dummyId')}
            />
          ))}
        </Padding>

        <Navigation />
        <Margin size={90} />
      </IonContent>
    </IonPage>
  );
};

export default Rank;
