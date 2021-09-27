import PropTypes from "prop-types";
import styled from "styled-components";

const HLine = styled.div`
  width: ${(props) => (props.size === null ? "100%" : `${props.size}px`)};
  border-bottom: 1px solid #cecece;
`;

const VLine = styled.div`
  width: 1px;
  height: ${(props) => (props.size === null ? "100%" : `${props.size}px`)};
  border-left: 1px solid #cecece;
`;

const Divider = ({ vertical, size }) => {
  if (vertical) return <VLine size={size} />;
  return <HLine size={size} />;
};

Divider.propTypes = {
  vertical: PropTypes.bool,
  size: PropTypes.number,
};

Divider.defaultProps = {
  vertical: false,
  size: null,
};

export default Divider;
