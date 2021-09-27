import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ITEM_TYPES } from 'constants/index.js';

import { Flex, Margin, Heart } from '..';

const ItemWrapper = styled.div`
  width: 165px;
  margin-right: 17px;

  &:last-child {
    margin: 0;
  }
`;

const ItemImage = styled.div`
  position: relative;
  width: 165px;
  height: 165px;
  border-radius: 15px;
  border: 1px solid #dedee0;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

const HeartWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const ItemName = styled.div`
  font-size: 10px;
`;

const ItemType = styled.div`
  font-size: 10px;
  color: #444444;
`;

const ItemPrice = styled.div`
  font-weight: bold;
`;

const ItemCard = ({ image, name, type, price, onHeartClick }) => (
  <ItemWrapper>
    <ItemImage image={image}>
      <HeartWrapper>
        <Heart onChange={onHeartClick} />
      </HeartWrapper>
    </ItemImage>
    <Margin size={10} />

    <Flex justify="space-between" align="center">
      <ItemName>{name}</ItemName>
      <ItemType>| {ITEM_TYPES[type]}</ItemType>
    </Flex>
    <Margin size={5} />

    <ItemPrice>{price.toLocaleString()}원</ItemPrice>
  </ItemWrapper>
);

ItemCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  type: PropTypes.string,
  onHeartClick: PropTypes.func,
};

ItemCard.defaultProps = {
  image: '',
  name: '',
  price: 0,
  type: 'official',
  onHeartClick: () => {},
};

export default ItemCard;
