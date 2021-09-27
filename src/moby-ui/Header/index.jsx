import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Flex } from '..';

import logoIcon from './logo-icon.png';

const Wrapper = styled.div`
  padding: 55px 17px 0 17px;
  background-color: #ffffff;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
`;

const Children = styled.div`
  padding-bottom: 10px;
  background-color: #ffffff;
`;

const LogoIcon = styled.img`
  margin-left: 15px;
`;

const Header = ({ title, children }) => (
  <Wrapper>
    <Flex align="center" direction="row">
      <Title>{title}</Title>
      <LogoIcon src={logoIcon} />
    </Flex>
    {children && <Children>{children}</Children>}
  </Wrapper>
);

Header.SubTitle = styled.div`
  margin-top: 5px;
  font-size: 14px;
`;

Header.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

Header.defaultProps = {
  title: '',
  children: null,
};

export default Header;
