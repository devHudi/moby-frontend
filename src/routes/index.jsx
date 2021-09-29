import { Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { Login, SignUp } from 'pages';

const Router = () => (
  <IonReactRouter>
    <IonRouterOutlet>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/sign-up">
        <SignUp />
      </Route>
    </IonRouterOutlet>
  </IonReactRouter>
);

export default Router;
