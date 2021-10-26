import { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';

import { Divider } from 'moby-ui';

import { GoTriangleDown } from 'react-icons/go';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 25px;
  border: 2px solid #9d9d9d;
  font-size: 10px;
  color: #9d9d9d;
  background-color: #ffffff;
`;

const ListWrapper = styled.div`
  position: absolute;
  top: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 6px;
  width: 80px;
  height: fit-content;
  border: 2px solid #9d9d9d;
  font-size: 10px;
  color: #9d9d9d;
  background-color: #ffffff;
`;

const ListItem = styled.div`
  padding: 6.5px 2px;
  width: 100%;
  text-align: left;
`;

const Inner = styled.div`
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Arrow = styled.div`
  transform: rotate(${(props) => (props.rotate ? '180deg' : '0deg')});
  margin-bottom: ${(props) => props.rotate && 3}px;
`;

const Dropdown = ({ items, onChange }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  const onSelect = (i) => {
    setSelected(i);
    onChange(i);
  };

  return (
    <>
      <Wrapper onClick={() => setOpen(!open)}>
        <Inner>
          {items[selected]}{' '}
          <Arrow rotate={open}>
            <GoTriangleDown />
          </Arrow>
        </Inner>
        {open && (
          <ListWrapper>
            {_.map(items, (item, i) => (
              <>
                <ListItem onClick={() => onSelect(i)}>{item}</ListItem>
                {items.length - 1 !== i && <Divider />}
              </>
            ))}
          </ListWrapper>
        )}
      </Wrapper>
    </>
  );
};

Dropdown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ),
  onChange: PropTypes.func,
};

Dropdown.defaultProps = {
  items: [],
  onChange: (i) => console.log(`${i} selected`),
};

export default Dropdown;
