import PropTypes from 'prop-types';
import styled from 'styled-components';

const HLine = styled.div`
  width: ${(props) => (props.size === null ? '100%' : `${props.size}px`)};
  border-bottom: ${(props) => props.weight}px solid ${(props) => props.color};
`;

const VLine = styled.div`
  width: 1px;
  height: ${(props) => (props.size === null ? '100%' : `${props.size}px`)};
  border-left: ${(props) => props.weight}px solid ${(props) => props.color};
`;

const Divider = ({ vertical, size, color, weight }) => {
  if (vertical) return <VLine size={size} color={color} weight={weight} />;
  return <HLine size={size} color={color} weight={weight} />;
};

Divider.propTypes = {
  vertical: PropTypes.bool,
  size: PropTypes.number,
  color: PropTypes.string,
  weight: PropTypes.number,
};

Divider.defaultProps = {
  vertical: false,
  size: null,
  color: '#cecece',
  weight: 1,
};

export default Divider;
