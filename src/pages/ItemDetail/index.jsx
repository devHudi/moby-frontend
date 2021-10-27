import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import { useHistory, useParams } from 'react-router-dom';
import { IonPage, IonContent } from '@ionic/react';
import { Divider, Image, Padding, Margin, Tab, AltHeader } from 'moby-ui';

import { useRecoilState } from 'recoil';
import { cartState } from 'states/cart';

import * as productsApi from 'apis/products';

import Header from './components/Header';
import ChartTab from './components/ChartTab';
import DetailTab from './components/DetailTab';
import Purchase from './components/Purchase';

const ItemDetail = () => {
  const history = useHistory();
  const { itemId } = useParams();

  const [tab, setTab] = useState(0);
  const [, setCart] = useRecoilState(cartState);

  const [item, setItem] = useState({});
  const [recommendedItems, setRecommendedItems] = useState([]);

  const jwt = localStorage.getItem('jwt');

  const getProduct = useCallback(async () => {
    const { data } = await productsApi.getProductDetail(itemId, jwt);
    setItem(data);
  }, [itemId, jwt]);

  const getRecommendedItems = useCallback(async () => {
    if (!item) return;

    const { data } = await productsApi.getProductByArtistId(
      item?.artistId,
      jwt,
    );

    setRecommendedItems(
      _.map(data, (obj) => ({
        id: obj?.id,
        image: obj?.posterSrc,
        name: obj?.title,
        type: obj?.isOfficial ? 'official' : 'community',
        price: obj?.currentPrice,
        onClick: () => history.push(`/items/${obj?.id}`),
      })),
    );
  }, [item, jwt, history]);

  const onTabChange = (i) => {
    setTab(i);
  };

  const onBuy = (id, quantity, price) => {
    history.push('/purchase');
    setCart({
      itemId: id,
      quantity,
      totalPrice: quantity * price,
    });
  };

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  useEffect(() => {
    getRecommendedItems();
  }, [getRecommendedItems]);

  return (
    <IonPage>
      <IonContent>
        <AltHeader
          title={item?.title}
          subtitle={item?.subTitle}
          onBackClick={() => history.goBack()}
        />

        <Image height={237} image={item?.posterSrc} />
        <Header
          price={item?.currentPrice || 0}
          stock={item?.quantity || 0}
          total={item?.totalQuantity || 0}
        />
        <Divider />
        <Padding>
          <Tab tabs={['CHART', 'DETAIL']} onChange={onTabChange} />

          <Margin size={17} />

          {tab === 0 && <ChartTab itemId={itemId} items={recommendedItems} />}
          {tab === 1 && <DetailTab images={[item?.detailImgSrc]} />}
        </Padding>

        <Purchase
          itemId={itemId}
          type={item?.isOfficial ? 'official' : 'community'}
          defaultBuyPrice={21000}
          defaultSellPrice={19000}
          onOfficialBuy={onBuy}
          onCommunityBuy={(id, quantity, buyPrice) =>
            console.log('커뮤니티 구매', id, quantity, buyPrice)
          }
          onCommunitySell={(id, quantity, buyPrice) =>
            console.log('커뮤니티 판매', id, quantity, buyPrice)
          }
        />
        <Margin size={90} />
      </IonContent>
    </IonPage>
  );
};

export default ItemDetail;
