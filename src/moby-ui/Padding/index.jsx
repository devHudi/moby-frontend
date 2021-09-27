import PropTypes from 'prop-types';
import styled from 'styled-components';

const PaddingView = styled.div`
  padding-top: ${(props) => (props.top === null ? props.padding : props.top)}px;
  padding-bottom: ${(props) =>
    props.bottom === null ? props.padding : props.bottom}px;
  padding-left: ${(props) =>
    props.left === null ? props.padding : props.left}px;
  padding-right: ${(props) =>
    props.right === null ? props.padding : props.right}px;
`;

const Padding = ({ padding, top, bottom, left, right, children }) => (
  <PaddingView
    padding={padding}
    top={top}
    bottom={bottom}
    left={left}
    right={right}
  >
    {children}
  </PaddingView>
);

Padding.propTypes = {
  padding: PropTypes.number,
  top: PropTypes.number,
  bottom: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
  children: PropTypes.node,
};

Padding.defaultProps = {
  padding: 10,
  top: null,
  bottom: null,
  left: null,
  right: null,
  children: null,
};

export default Padding;
