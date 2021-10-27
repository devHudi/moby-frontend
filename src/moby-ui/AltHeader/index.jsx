import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MdArrowBack } from 'react-icons/md';

import { Flex } from '..';

const Wrapper = styled.div`
  padding: 55px 17px 17px 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
`;

const IconWrapper = styled.div`
  font-size: 20px;
  color: #727272;
  flex-basis: 32px;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
`;

const Subtitle = styled.div`
  font-size: 12px;
  text-align: center;
`;

const Blank = styled.div`
  flex-basis: 32px;
`;

const SubHeader = ({ title, subtitle, onBackClick }) => (
  <Wrapper>
    <IconWrapper>
      {onBackClick && <MdArrowBack onClick={onBackClick} />}
    </IconWrapper>
    <Flex align="center" direction="column">
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Flex>
    <Blank />
  </Wrapper>
);

SubHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onBackClick: PropTypes.func,
};

SubHeader.defaultProps = {
  title: '',
  subtitle: '',
  onBackClick: null,
};

export default SubHeader;
