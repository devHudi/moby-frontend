import { Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';

import { IonRouterOutlet, useIonToast } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import {
  Login,
  SignUp,
  MarketPlace,
  ArtistDetail,
  ItemDetail,
  Purchase,
  PurchaseSuccess,
  MyWallet,
  MyPage,
  Rank,
} from 'pages';

const PublicRoute = ({ ...props }) => {
  const jwt = localStorage.getItem('jwt');

  try {
    const { exp } = jwtDecode(jwt);
    const isExpired = dayjs(new Date()).isAfter(new Date(exp * 1000));

    if (!isExpired) {
      return <Redirect to="/" />;
    }

    return <Route {...props} />;
  } catch {
    return <Route {...props} />;
  }
};

const PrivateRoute = ({ ...props }) => {
  const [present, dismiss] = useIonToast();

  const alert = () =>
    present({
      buttons: [{ text: '확인', handler: () => dismiss() }],
      duration: 2000,
      message: '로그인이 필요합니다.',
    });

  const jwt = localStorage.getItem('jwt');

  try {
    const { exp } = jwtDecode(jwt);
    const isExpired = dayjs(new Date()).isAfter(new Date(exp * 1000));

    if (isExpired) {
      alert();
      return <Redirect to="/login" />;
    }

    return <Route {...props} />;
  } catch {
    alert();
    return <Redirect to="/login" />;
  }
};

const Router = () => (
  <IonReactRouter>
    <IonRouterOutlet>
      <PublicRoute exact path="/login">
        <Login />
      </PublicRoute>
      <PublicRoute exact path="/sign-up">
        <SignUp />
      </PublicRoute>
      <PrivateRoute exact path="/">
        <MarketPlace />
      </PrivateRoute>
      <PrivateRoute exact path="/artists/:artistId">
        <ArtistDetail />
      </PrivateRoute>
      <PrivateRoute exact path="/items/:itemId">
        <ItemDetail />
      </PrivateRoute>
      <PrivateRoute exact path="/purchase">
        <Purchase />
      </PrivateRoute>
      <PrivateRoute exact path="/purchase-success/:id">
        <PurchaseSuccess />
      </PrivateRoute>
      <PrivateRoute exact path="/my-wallet">
        <MyWallet />
      </PrivateRoute>
      <PrivateRoute exact path="/my-page">
        <MyPage />
      </PrivateRoute>
      <PrivateRoute exact path="/rank">
        <Rank />
      </PrivateRoute>
    </IonRouterOutlet>
  </IonReactRouter>
);

export default Router;
