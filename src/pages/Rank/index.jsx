import styled from 'styled-components';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { IonPage, IonContent } from '@ionic/react';
import {
  AltHeader,
  Divider,
  Padding,
  Margin,
  Typography,
  Navigation,
  Flex,
} from 'moby-ui';

import Item from './components/Item';

const dummyRanks = Array.from(Array(10)).map((item, i) => ({
  rank: i + 1,
  name: `상품 ${i + 1}`,
  status: 2,
  isNew: true,
  image: 'http://placehold.it/300x300',
  sales: 10912342,
  likes: 12341234,
  clicks: 2394829,
}));

const Rank = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent>
        <AltHeader
          title="실시간 NFT 순위"
          onBackClick={() => history.goBack()}
        />
        <Divider />

        <Padding padding={30} top={21}>
          {_.map(dummyRanks, (item) => (
            <Item
              rank={item.rank}
              name={item.name}
              status={item.status}
              isNew={item.isNew}
              image={item.image}
              sales={item.sales}
              likes={item.likes}
              clicks={item.clicks}
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
