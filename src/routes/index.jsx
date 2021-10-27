import { Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';

import { IonRouterOutlet } from '@ionic/react';
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
  AddCard,
  MyPage,
  Rank,
  ArtistRank,
} from 'pages';

import { Spinner } from 'moby-ui';

import { useRecoilState } from 'recoil';
import { spinnerState } from 'states/spinner';

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
  const jwt = localStorage.getItem('jwt');

  try {
    const { exp } = jwtDecode(jwt);
    const isExpired = dayjs(new Date()).isAfter(new Date(exp * 1000));

    if (isExpired) {
      return <Redirect to="/login" />;
    }

    return <Route {...props} />;
  } catch {
    return <Redirect to="/login" />;
  }
};

const Router = () => {
  const [spinner] = useRecoilState(spinnerState);

  return (
    <IonReactRouter>
      {spinner && <Spinner />}

      <IonRouterOutlet>
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
        <PrivateRoute exact path="/my-wallet/add-card">
          <AddCard />
        </PrivateRoute>
        <PrivateRoute exact path="/my-page">
          <MyPage />
        </PrivateRoute>
        <PrivateRoute exact path="/rank/nft">
          <Rank />
        </PrivateRoute>
        <PrivateRoute exact path="/rank/artist">
          <ArtistRank />
        </PrivateRoute>
        <PublicRoute exact path="/login">
          <Login />
        </PublicRoute>
        <PublicRoute exact path="/sign-up">
          <SignUp />
        </PublicRoute>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Router;
