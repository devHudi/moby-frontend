import { useHistory } from 'react-router-dom';
import { useIonToast } from '@ionic/react';
import styled from 'styled-components';

import marketPlaceImage from './images/market-place.png';
import myWalletImage from './images/my-wallet.png';
import nfcImage from './images/nfc.png';
import settingImage from './images/setting.png';

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 90px;
  background-color: #3b1198;
  z-index: 100;
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-basis: 25%;
`;

const MenuIcon = styled.img`
  margin-bottom: 8px;
`;

const MenuText = styled.div`
  font-size: 8px;
  letter-spacing: -1px;
  color: #ffffff;
`;

const Navigation = () => {
  const history = useHistory();
  const [present, dismiss] = useIonToast();

  const onToast = () => {
    present({
      buttons: [{ text: '확인', handler: () => dismiss() }],
      duration: 2000,
      message: '해당 기능은 추후 제공될 예정입니다.',
    });
  };

  return (
    <Wrapper>
      <Menu onClick={() => history.push('/')}>
        <MenuIcon src={marketPlaceImage} />
        <MenuText>MARKET PLACE</MenuText>
      </Menu>
      <Menu onClick={() => history.push('/my-wallet')}>
        <MenuIcon src={myWalletImage} />
        <MenuText>MY WALLET</MenuText>
      </Menu>
      {/* <Menu onClick={onToast}>
        <MenuIcon src={nfcImage} />
        <MenuText>NFC</MenuText>
      </Menu> */}
      <Menu onClick={() => history.push('/my-page')}>
        <MenuIcon src={settingImage} />
        <MenuText>MY PAGE</MenuText>
      </Menu>
    </Wrapper>
  );
};

export default Navigation;
