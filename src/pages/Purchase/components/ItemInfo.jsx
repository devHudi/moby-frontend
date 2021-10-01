import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography, Margin, Flex, Image } from 'moby-ui';
import { ITEM_TYPES } from 'constants/index.js';

const ItemImage = styled(Image)`
  margin-right: 25px;
  flex-basis: 141px;
  min-width: 141px;
  height: 141px;
  border-radius: 10px;
  border: 1px solid #dddddd;
`;

const ItemInfo = ({ type, name, quantity, price }) => (
  <Flex>
    <ItemImage image="https://picsum.photos/300/300" />

    <Flex direction="column">
      <Typography size={10} color="#444444">
        {ITEM_TYPES[type]}
      </Typography>
      <Margin size={5} />

      <Typography size={12}>{name}</Typography>
      <Margin size={10} />

      <Typography size={10} color="#444444">
        수량
      </Typography>
      <Margin size={5} />

      <Typography size={15} weight="bold">
        {quantity}
      </Typography>
      <Margin size={5} />

      <Typography size={10} color="#444444">
        결제 금액
      </Typography>
      <Margin size={5} />

      <Typography size={15} weight="bold">
        {price.toLocaleString()} 원
      </Typography>
    </Flex>
  </Flex>
);

ItemInfo.propTypes = {
  type: PropTypes.oneOf(['official', 'community']),
  name: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.number,
};

ItemInfo.defaultProps = {
  type: 'official',
  name: null,
  quantity: 0,
  price: 0,
};

export default ItemInfo;
