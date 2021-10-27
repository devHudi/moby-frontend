import { useState, useCallback, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { IonPage, IonContent, useIonToast } from '@ionic/react';
import { AltHeader, Divider, Padding, Margin, Typography } from 'moby-ui';

import { useRecoilValue, useRecoilState } from 'recoil';
import { spinnerState } from 'states/spinner';
import { cartState } from 'states/cart';

import {
  AiOutlineCreditCard,
  AiOutlineMobile,
  AiOutlineWallet,
} from 'react-icons/ai';

import * as productsApi from 'apis/products';
import * as usersApi from 'apis/users';
import * as transactionsApi from 'apis/transactions';

import ItemInfo from './components/ItemInfo';
import Method from './components/Method';
import Price from './components/Price';

const Purchase = () => {
  const history = useHistory();

  const jwt = localStorage.getItem('jwt');

  const [, setSpinner] = useRecoilState(spinnerState);
  const cart = useRecoilValue(cartState);

  const [present, dismiss] = useIonToast();
  const [selected, setSelected] = useState(false);

  const [money, setMoney] = useState(0);
  const [item, setItem] = useState({});

  const toast = useCallback(
    (message) => {
      present({
        buttons: [{ text: '확인', handler: () => dismiss() }],
        duration: 2000,
        message,
      });
    },
    [present, dismiss],
  );

  const getUser = useCallback(async () => {
    const { data } = await usersApi.getCurrentUser(jwt);
    setMoney(data?.user.money);
  }, [jwt]);

  const getProduct = useCallback(async () => {
    const { data } = await productsApi.getProductDetail(cart.itemId, jwt);
    setItem(data);
  }, [cart, jwt]);

  const onPurchase = useCallback(async () => {
    setSpinner(true);
    try {
      await transactionsApi.addTransaction(
        cart.itemId,
        cart.totalPrice,
        cart.quantity,
        jwt,
      );

      toast('결제에 성공하였습니다.');
      history.push('/');
    } catch (error) {
      const { message } = error.response.data;
      toast(`${message} 잠시 후 다시 시도해주세요.`);
    }
    setSpinner(false);
  }, [cart, jwt, toast, history, setSpinner]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (!cart?.itemId) return <Redirect to="/" />;

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
            image={item?.posterSrc}
            name={item?.title}
            quantity={cart.quantity}
            price={cart.totalPrice}
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
            balance={money}
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
            onClick={() => toast('해당 결제 방식은 추후 지원될 예정입니다.')}
          />
          <Method
            icon={<AiOutlineMobile />}
            name="휴대폰 결제"
            onClick={() => toast('해당 결제 방식은 추후 지원될 예정입니다.')}
          />
          <Method
            icon={<AiOutlineWallet />}
            name="무통장입금"
            onClick={() => toast('해당 결제 방식은 추후 지원될 예정입니다.')}
          />
        </Padding>

        <Price
          price={cart.totalPrice}
          balance={money}
          methodSelected={selected}
          onPurchase={onPurchase}
        />
        <Margin size={90} />
      </IonContent>
    </IonPage>
  );
};

export default Purchase;
