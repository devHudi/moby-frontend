import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import styled from 'styled-components';
import {
  Header,
  Divider,
  AltTab,
  Image,
  Typography,
  Margin,
  Padding,
  Flex,
} from 'moby-ui';

import { MdKeyboardArrowRight } from 'react-icons/md';

const ItemImage = styled(Image)`
  margin-right: 23px;
  flex-basis: 150px;
  min-width: 150px;
  height: 150px;
  border-radius: 10px;
  border: 1px solid #dddddd;
`;

const RightWrapper = styled(Flex)``;

const Item = ({
  image,
  name,
  date,
  buyPrice,
  currentPrice,
  holding,
  holdingPercentage,
  onClick,
}) => (
  <Flex align="center">
    <ItemImage image={image} />
    <RightWrapper direction="column">
      <Typography size={13} weight="bold">
        {name}
      </Typography>
      <Margin size={6} />

      <Typography size={9}>{dayjs(date).format('YYYY.MM.DD')}</Typography>
      <Margin size={24} />

      <Typography size={9}>
        구매가격 | {buyPrice.toLocaleString()} 원
      </Typography>
      <Margin size={8} />

      <Typography size={9}>
        현재가격 | {currentPrice.toLocaleString()} 원
      </Typography>
      <Margin size={10} />

      <Typography size={12} weight="bold">
        보유수량 {holding}개 | {holdingPercentage}%
      </Typography>
      <Margin size={11} />

      <Typography size={9} color="#777777">
        <Flex align="center">
          상세보기
          <MdKeyboardArrowRight />
        </Flex>
      </Typography>
    </RightWrapper>
  </Flex>
);

Item.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  buyPrice: PropTypes.number,
  currentPrice: PropTypes.number,
  holding: PropTypes.number,
  holdingPercentage: PropTypes.number,
  onClick: PropTypes.func,
};

Item.defaultProps = {
  image: null,
  name: null,
  date: new Date(),
  buyPrice: 0,
  currentPrice: 0,
  holding: 0,
  holdingPercentage: 0,
  onClick: () => console.log('Item Click'),
};

export default Item;
