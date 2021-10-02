import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const Wrapper = styled.div`
  display: inline-block;
  color: ${(props) => (props.filled ? '#FF381A' : props.borderColor)};
  font-size: ${(props) => props.size}px;
`;

const Heart = ({ defaultFilled, borderColor, size, onChange }) => {
  const [filled, setFilled] = useState(defaultFilled);

  const onClick = (e) => {
    if (onChange) {
      onChange(!filled, e);
      setFilled(!filled);
    }
  };

  return (
    <Wrapper
      filled={filled}
      borderColor={borderColor}
      size={size}
      onClick={onClick}
    >
      {filled ? <AiFillHeart /> : <AiOutlineHeart />}
    </Wrapper>
  );
};

Heart.propTypes = {
  defaultFilled: PropTypes.bool,
  borderColor: PropTypes.string,
  size: PropTypes.number,
  onChange: PropTypes.func,
};

Heart.defaultProps = {
  defaultFilled: false,
  borderColor: '#ffffff',
  size: 18,
  onChange: null,
};

export default Heart;
