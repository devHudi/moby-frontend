import { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import _ from 'lodash';
// import {
//   IonModal,
//   IonList,
//   IonRadioGroup,
//   IonListHeader,
//   IonLabel,
//   IonItem,
//   IonRadio,
//   IonItemDivider,
//   IonInput,
//   IonButton,
// } from '@ionic/react';
import { Flex, Divider, Dropdown, Typography, Margin, Button } from 'moby-ui';

const ButtonWrapper = ({ name, price, label, disabled, onClick }) => (
  <Flex direction="column" align="center">
    <Typography size={5} color="#4C4C4C">
      {name}
    </Typography>
    <Typography size={12} weight="bold">
      {price.toLocaleString()}
    </Typography>
    <Margin size={5} />
    <Button width={90} onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  </Flex>
);

ButtonWrapper.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

ButtonWrapper.defaultProps = {
  name: null,
  price: 0,
  label: null,
  disabled: false,
  onClick: () => console.log('Button Click'),
};

const PriceTextFieldWrapper = styled.div`
  padding-bottom: 3px;
  display: flex;
  align-items: flex-end;
  border-bottom: 1px solid #000000;
`;

const FixedPrice = ({ price, onClick }) => (
  <PriceTextFieldWrapper onClick={onClick}>
    <Typography size={6} color="#4C4C4C">
      구매금액
    </Typography>
    <Margin size={13} />

    <Typography size={14} weight="bold">
      {price.toLocaleString()}
    </Typography>
    <Margin size={4} />

    <Typography size={8}>KRW</Typography>
  </PriceTextFieldWrapper>
);

FixedPrice.propTypes = {
  price: PropTypes.number,
  onClick: PropTypes.func,
};

FixedPrice.defaultProps = {
  price: 0,
  onClick: () => console.log('FixedPrice Click'),
};

const Wrapper = styled(Flex)`
  position: fixed;
  bottom: 0;
  padding: 0 20px;
  width: 100%;
  height: 90px;
  background-color: #ffffff;
  border-top: 1px solid #3b1198;
  z-index: 100;
`;

const DropdownWrapper = styled.div``;

const LeftWrapper = styled(Flex)`
  flex-basis: 120px;
  max-width: 120px;
`;
const RightWrapper = styled(Flex)`
  flex-basis: 120px;
  max-width: 120px;
`;

const Purchase = ({ defaultBuyPrice, defaultSellPrice, type }) => {
  const history = useHistory();

  const [buyOpen, setBuyOpen] = useState(false); // eslint-disable-line
  const [sellOpen, setSellOpen] = useState(false); // eslint-disable-line
  const [buyPrice, setBuyPrice] = useState(defaultBuyPrice); // eslint-disable-line
  const [sellPrice, setSellPrice] = useState(defaultSellPrice); // eslint-disable-line

  const onOfficialBuy = () => {
    history.push('/purchase');
  };

  const onCommunityBuy = () => {
    setBuyOpen(true);
  };

  const onCommunitySell = () => {
    setSellOpen(true);
  };

  return (
    <>
      <Wrapper justify="space-between" align="center">
        <DropdownWrapper>
          <Dropdown items={_.range(1, 11)} />
        </DropdownWrapper>

        <LeftWrapper justify="center">
          {type === 'official' && <FixedPrice price={buyPrice} />}

          {type === 'community' && (
            <ButtonWrapper
              name="즉시구매가"
              price={sellPrice}
              label="구매하기"
              onClick={onCommunityBuy}
            />
          )}
        </LeftWrapper>

        <Divider size={64} vertical />

        <RightWrapper justify="center">
          {type === 'official' && (
            <ButtonWrapper
              name="총액"
              price={buyPrice}
              label="구매하기"
              onClick={onOfficialBuy}
            />
          )}

          {type === 'community' && (
            <ButtonWrapper
              name="즉시판매가"
              price={sellPrice}
              label="판매하기"
              onClick={onCommunitySell}
            />
          )}
        </RightWrapper>
      </Wrapper>
    </>
  );
};

Purchase.propTypes = {
  defaultBuyPrice: PropTypes.number,
  defaultSellPrice: PropTypes.number,
  type: PropTypes.oneOf(['official', 'community']),
};

Purchase.defaultProps = {
  defaultBuyPrice: 0,
  defaultSellPrice: 0,
  type: 'official',
};

export default Purchase;
