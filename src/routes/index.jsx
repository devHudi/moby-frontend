import { Route } from 'react-router-dom';
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
  MyPage,
  Rank,
} from 'pages';

const Router = () => (
  <IonReactRouter>
    <IonRouterOutlet>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/sign-up">
        <SignUp />
      </Route>
      <Route exact path="/">
        <MarketPlace />
      </Route>
      <Route exact path="/artists/:artistId">
        <ArtistDetail />
      </Route>
      <Route exact path="/items/:itemId">
        <ItemDetail />
      </Route>
      <Route exact path="/purchase">
        <Purchase />
      </Route>
      <Route exact path="/purchase-success/:id">
        <PurchaseSuccess />
      </Route>
      <Route exact path="/my-wallet">
        <MyWallet />
      </Route>
      <Route exact path="/my-page">
        <MyPage />
      </Route>
      <Route exact path="/rank">
        <Rank />
      </Route>
    </IonRouterOutlet>
  </IonReactRouter>
);

export default Router;
