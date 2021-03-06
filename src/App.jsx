import { IonApp } from '@ionic/react';
import { createGlobalStyle } from 'styled-components';

import { RecoilRoot } from 'recoil';

import Router from 'routes';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    outline: none;
  }

  body {
    display: flex;
    justify-content: center;
  }

  #root > .ion-page {
    max-width: 414px;
    margin: 0 auto;
  }
`;

const App = () => (
  <RecoilRoot>
    <IonApp>
      <GlobalStyle />
      <Router />
    </IonApp>
  </RecoilRoot>
);

export default App;
