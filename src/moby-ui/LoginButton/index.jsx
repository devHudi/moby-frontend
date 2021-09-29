import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 100%;
  height: 35px;
  background-color: #d3d3ff;
  border-radius: 12px;
  color: #051465;
  font-size: 14px;
`;

const LoginButton = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);

LoginButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired,
};

LoginButton.defaultProps = {
  disabled: false,
  onClick: () => {},
};

export default LoginButton;
