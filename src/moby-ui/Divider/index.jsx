import PropTypes from 'prop-types';
import styled from 'styled-components';

const HLine = styled.div`
  width: ${(props) => (props.size === null ? '100%' : `${props.size}px`)};
  border-bottom: 1px solid ${(props) => props.color};
`;

const VLine = styled.div`
  width: 1px;
  height: ${(props) => (props.size === null ? '100%' : `${props.size}px`)};
  border-left: 1px solid ${(props) => props.color};
`;

const Divider = ({ vertical, size, color }) => {
  if (vertical) return <VLine size={size} color={color} />;
  return <HLine size={size} color={color} />;
};

Divider.propTypes = {
  vertical: PropTypes.bool,
  size: PropTypes.number,
  color: PropTypes.string,
};

Divider.defaultProps = {
  vertical: false,
  size: null,
  color: '#cecece',
};

export default Divider;
