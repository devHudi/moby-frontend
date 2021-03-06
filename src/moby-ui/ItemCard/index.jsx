import { useState, useCallback } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useIonViewWillEnter } from '@ionic/react';

import { ITEM_TYPES } from 'constants/index.js';

import * as favsApi from 'apis/favs';

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
  flex-basis: 100px;
  text-align: right;
`;

const ItemPrice = styled.div`
  font-weight: bold;
`;

const ItemCard = ({ id, image, name, type, price, onClick }) => {
  const [heart, setHeart] = useState(false);
  const jwt = localStorage.getItem('jwt');

  const getProductHeart = useCallback(async () => {
    const { data } = await favsApi.getAllFavProduct(jwt);

    setHeart(_.find(data, { id }) !== undefined);
  }, [id, jwt]);

  const addFav = useCallback(async () => {
    setHeart(true);
    await favsApi.appendFavProduct(id, jwt);
  }, [id, jwt]);

  const deleteFav = useCallback(async () => {
    setHeart(false);
    await favsApi.deleteFavProduct(id, jwt);
  }, [id, jwt]);

  const handleHeartClick = (e) => {
    e.stopPropagation();

    if (heart) {
      deleteFav();
    } else {
      addFav();
    }
  };

  useIonViewWillEnter(() => {
    getProductHeart();
  }, [getProductHeart]);

  return (
    <ItemWrapper onClick={onClick}>
      <ItemImage image={image}>
        <HeartWrapper>
          <Heart filled={heart} onChange={handleHeartClick} />
        </HeartWrapper>
      </ItemImage>
      <Margin size={10} />

      <Flex justify="space-between" align="flex-start">
        <ItemName>{name}</ItemName>
        <ItemType>| {ITEM_TYPES[type]}</ItemType>
      </Flex>
      <Margin size={5} />

      <ItemPrice>{price.toLocaleString()}???</ItemPrice>
    </ItemWrapper>
  );
};

ItemCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

ItemCard.defaultProps = {
  image: '',
  name: '',
  price: 0,
  type: 'official',
  onClick: () => console.log('ItemCard Click'),
};

export default ItemCard;
