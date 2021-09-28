import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex } from '..';

const Wrapper = styled.div`
  overflow-y: hidden;
  overflow-x: scroll;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    /* Hide scrollbar for Chrome, Safari and Opera */
    display: none;
  }
`;

const HScroll = ({ children }) => (
  <Wrapper>
    <Flex>{children}</Flex>
  </Wrapper>
);

HScroll.propTypes = {
  children: PropTypes.node,
};

HScroll.defaultProps = {
  children: null,
};

export default HScroll;
