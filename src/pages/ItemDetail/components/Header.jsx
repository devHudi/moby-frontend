import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex, Padding, Margin, Typography } from 'moby-ui';
import { ITEM_TYPES } from 'constants/index.js';

const Value = styled.div`
  flex-grow: 1;
  font-size: 15px;
  text-align: right;
`;

const Header = ({ price, type, stock, total }) => (
  <Padding padding={25} top={17} bottom={20}>
    <Flex justify="space-between" align="center">
      <Typography size={17} weight="bold">
        NFT {price.toLocaleString()} 원
      </Typography>
      <Value>| {ITEM_TYPES[type]}</Value>
    </Flex>

    <Margin size={8} />

    <Flex justify="space-between" align="center">
      <Typography size={15} weight="bold">
        잔여수량
      </Typography>
      <Value>
        {stock.toLocaleString()} / {total.toLocaleString()}
      </Value>
    </Flex>
  </Padding>
);

Header.propTypes = {
  price: PropTypes.number,
  type: PropTypes.string,
  stock: PropTypes.number,
  total: PropTypes.number,
};

Header.defaultProps = {
  price: 0,
  type: 'official',
  stock: 0,
  total: 0,
};

export default Header;
