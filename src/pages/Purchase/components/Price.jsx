import { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography } from 'moby-ui';
import { useIonToast } from '@ionic/react';

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  width: 100%;
  height: 90px;
  background-color: #3b1198;
  z-index: 100;
`;

const Price = ({ price, balance, methodSelected, onPurchase }) => {
  const [present, dismiss] = useIonToast();

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
  const handlePurchase = () => {
    if (!methodSelected) {
      toast('결제수단을 선택해주세요.');
      return;
    }

    if (balance < price) {
      toast('잔액이 부족합니다.');
      return;
    }

    onPurchase();
  };

  return (
    <Wrapper>
      <Typography size={15} color="#ffffff">
        결제금액
      </Typography>
      <Typography size={24} weight="bold" color="#ffffff">
        {price.toLocaleString()} 원 | <span onClick={handlePurchase}>결제</span>
      </Typography>
    </Wrapper>
  );
};

Price.propTypes = {
  price: PropTypes.number,
  balance: PropTypes.number,
  methodSelected: PropTypes.bool,
  onPurchase: PropTypes.func,
};

Price.defaultProps = {
  price: 0,
  balance: -1,
  methodSelected: false,
  onPurchase: () => {},
};

export default Price;
