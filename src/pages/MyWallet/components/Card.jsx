import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';

import icImage from './ic.png';

const COLORS = ['#FFC400', '#1864ab', '#5f3dc4', '#a61e4d', '#212529'];

const Wrapper = styled.div`
  position: relative;
  margin-right: 15px;
  flex-basis: 224.82px;
  min-width: 224.82px;
  height: 141.8px;
  border-radius: 10px;
  background-color: ${(props) => props.color};
`;

const IC = styled.img`
  position: absolute;
  top: 45.5px;
  left: 16.5px;
`;

const CardName = styled.div`
  position: absolute;
  top: 12.5px;
  left: 16.3px;
  color: #ffffff;
  font-size: 15px;
`;

const CardNumber = styled.div`
  position: absolute;
  top: 107.5px;
  right: 20.5px;
  color: #ffffff;
  font-size: 12px;
`;

const Card = ({ name, number }) => {
  const color = COLORS[number % COLORS.length];

  return (
    <Wrapper color={color}>
      <IC src={icImage} />
      <CardName>{name}</CardName>
      <CardNumber>{number}</CardNumber>
    </Wrapper>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};

export default Card;
