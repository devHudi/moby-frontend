import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography, Margin } from 'moby-ui';
import { VscInbox } from 'react-icons/vsc';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${(props) => (props.height ? `${props.height}px` : 'auto')};
`;

const Icon = styled.div`
  color: #868e96;
  font-size: 40px;
`;

const NoContent = ({ height }) => (
  <Wrapper height={height}>
    <Icon>
      <VscInbox />
    </Icon>

    <Margin size={10} />

    <Typography color="#868e96">표시할 내용이 없습니다</Typography>
  </Wrapper>
);

NoContent.propTypes = {
  height: PropTypes.number,
};

NoContent.defaultProps = {
  height: null,
};

export default NoContent;
