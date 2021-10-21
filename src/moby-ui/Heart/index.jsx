import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const Wrapper = styled.div`
  display: inline-block;
  color: ${(props) => (props.filled ? '#FF381A' : props.borderColor)};
  font-size: ${(props) => props.size}px;
`;

const Heart = ({ filled, borderColor, size, onChange }) => (
  <Wrapper
    filled={filled}
    borderColor={borderColor}
    size={size}
    onClick={onChange}
  >
    {filled ? <AiFillHeart /> : <AiOutlineHeart />}
  </Wrapper>
);

Heart.propTypes = {
  filled: PropTypes.bool,
  borderColor: PropTypes.string,
  size: PropTypes.number,
  onChange: PropTypes.func,
};

Heart.defaultProps = {
  filled: false,
  borderColor: '#ffffff',
  size: 18,
  onChange: null,
};

export default Heart;
