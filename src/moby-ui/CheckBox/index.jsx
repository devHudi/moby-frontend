import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { GoCheck } from 'react-icons/go';

import { Flex } from '..';

const StyledText = styled.div`
  color: #ffffff;
  font-size: 11px;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  width: 12px;
  height: 12px;
  background-color: ${(props) => (props.checked ? '#000000' : '#ffffff')};
  border-radius: 2px;
  font-size: 10px;
`;

const CheckBox = ({ onChange, children }) => {
  const [checked, setChecked] = useState(false);

  const onClick = () => {
    onChange(!checked);
    setChecked(!checked);
  };

  return (
    <div onClick={onClick}>
      <Flex align="center" height="40px">
        <Box>{checked && <GoCheck />}</Box>
        <StyledText>{children}</StyledText>
      </Flex>
    </div>
  );
};

CheckBox.propTypes = {
  onChange: PropTypes.func,
  children: PropTypes.string,
};

CheckBox.defaultProps = {
  onChange: (checked) => {
    console.log('checked:', checked);
  },
  children: '',
};
export default CheckBox;
