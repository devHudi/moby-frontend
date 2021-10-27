import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';

import {
  Flex,
  Divider,
  Dropdown,
  Typography,
  Margin,
  Button,
  Modal,
  TextField,
} from 'moby-ui';

const PriceField = styled(Typography)`
  max-width: 100px;
  text-overflow: ellipsis;
  display: inline;
  white-space: nowrap;
  overflow: hidden;
`;

const ButtonWrapper = ({ name, price, label, disabled, onClick }) => (
  <Flex direction="column" align="center">
    <Typography size={5} color="#4C4C4C">
      {name}
    </Typography>
    <PriceField size={12} weight="bold">
      {Number(price).toLocaleString()}
    </PriceField>
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
  letter-spacing: -1px;
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

const Purchase = ({
  itemId,
  defaultBuyPrice,
  defaultSellPrice,
  type,
  onOfficialBuy,
  onCommunityBuy,
  onCommunitySell,
}) => {
  const [quantity, setQuantity] = useState(1);

  const [buyOpen, setBuyOpen] = useState(false);
  const [sellOpen, setSellOpen] = useState(false);
  const [buyPrice, setBuyPrice] = useState(defaultBuyPrice);
  const [sellPrice, setSellPrice] = useState(defaultSellPrice);

  useEffect(() => {
    setBuyPrice(defaultBuyPrice);
  }, [defaultBuyPrice]);

  useEffect(() => {
    setSellPrice(defaultSellPrice);
  }, [defaultSellPrice]);

  return (
    <>
      {(buyOpen || sellOpen) && (
        <Modal
          title={buyOpen ? '구매' : '판매'}
          onConfirm={() => {
            if (buyOpen) {
              setBuyOpen(false);
              onCommunityBuy(itemId, quantity, buyPrice);
            } else {
              setSellOpen(false);
              onCommunitySell(itemId, quantity, sellPrice);
            }
          }}
          onCancel={() => {
            if (buyOpen) setBuyOpen(false);
            else setSellOpen(false);
          }}
        >
          <Flex align="center" justify="center">
            <TextField
              type="number"
              underline
              width={50}
              defaultValue={buyOpen ? buyPrice : sellPrice}
              onChange={(e) => {
                const { value } = e.target;
                if (buyOpen) setBuyPrice(value);
                else setSellPrice(value);
              }}
            />
            KRW
          </Flex>
        </Modal>
      )}

      <Wrapper justify="space-between" align="center">
        <DropdownWrapper>
          <Dropdown items={_.range(1, 11)} onChange={(n) => setQuantity(n)} />
        </DropdownWrapper>

        <LeftWrapper justify="center">
          {type === 'official' && <FixedPrice price={buyPrice} />}

          {type === 'community' && (
            <ButtonWrapper
              name="구매가"
              price={buyPrice || '0'}
              label="구매하기"
              onClick={() => setBuyOpen(true)}
            />
          )}
        </LeftWrapper>

        <Divider size={64} vertical />

        <RightWrapper justify="center">
          {type === 'official' && (
            <ButtonWrapper
              name="총액"
              price={buyPrice * quantity || '0'}
              label="구매하기"
              onClick={() => onOfficialBuy(itemId, quantity, buyPrice)}
            />
          )}

          {type === 'community' && (
            <ButtonWrapper
              name="판매가"
              price={sellPrice || '0'}
              label="판매하기"
              onClick={() => setSellOpen(true)}
            />
          )}
        </RightWrapper>
      </Wrapper>
    </>
  );
};

Purchase.propTypes = {
  itemId: PropTypes.string.isRequired,
  defaultBuyPrice: PropTypes.number,
  defaultSellPrice: PropTypes.number,
  type: PropTypes.oneOf(['official', 'community']),
  onOfficialBuy: PropTypes.func,
  onCommunityBuy: PropTypes.func,
  onCommunitySell: PropTypes.func,
};

Purchase.defaultProps = {
  defaultBuyPrice: 0,
  defaultSellPrice: 0,
  type: 'official',
  onOfficialBuy: () => console.log('on buy'),
  onCommunityBuy: () => console.log('on buy'),
  onCommunitySell: () => console.log('on sell'),
};

export default Purchase;
