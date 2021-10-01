import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography } from 'moby-ui';

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

const Price = ({ price }) => (
  <Wrapper>
    <Typography size={15} color="#ffffff">
      결제금액
    </Typography>
    <Typography size={24} weight="bold" color="#ffffff">
      {price.toLocaleString()} 원 | 결제
    </Typography>
  </Wrapper>
);

Price.propTypes = {
  price: PropTypes.number,
};

Price.defaultProps = {
  price: 0,
};

export default Price;