import PropTypes from 'prop-types';
import styled from 'styled-components';

import icImage from './ic.png';
import plusImage from './plus.png';

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

const AddWrapper = styled(Wrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #7334e4;
  background-color: #f4efff;
`;

const Card = ({ name, number, isAdd, onClick }) => {
  if (isAdd) {
    return (
      <AddWrapper onClick={onClick}>
        <img src={plusImage} />
      </AddWrapper>
    );
  }

  const color = COLORS[number % COLORS.length];

  const formattedNumber = String(number).replace(
    /(\d{4})(\d{4})(\d{4})(\d{2})/,
    '$1-$2-$3-$4',
  );

  return (
    <Wrapper color={color} onClick={onClick}>
      <IC src={icImage} />
      <CardName>{name}</CardName>
      <CardNumber>{formattedNumber}</CardNumber>
    </Wrapper>
  );
};

Card.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  isAdd: PropTypes.bool,
  onClick: PropTypes.func,
};

Card.defaultProps = {
  name: '',
  number: '',
  isAdd: false,
  onClick: () => {},
};

export default Card;
