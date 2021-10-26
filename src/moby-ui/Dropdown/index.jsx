import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import {
  IonModal,
  IonList,
  IonRadioGroup,
  IonRadio,
  IonListHeader,
  IonLabel,
  IonItem,
  IonButton,
} from '@ionic/react';

import { GoTriangleDown } from 'react-icons/go';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 30px;
  background-color: #ffffff;
  border: 2px solid #3b1198;
  border-radius: 30px;
  font-size: 11px;
  color: #3b1198;
`;

const List = styled.div`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  bottom: -2px;
  width: 80px;
  height: fit-content;
  background-color: #ffffff;
  border: 2px solid #3b1198;
  border-radius: 15px;
`;

const ListInner = styled.div`
  width: 100%;
  height: 150px;
  overflow-y: scroll;
`;

const Item = styled.div`
  padding: 6px;
  font-size: 11px;
  text-align: center;
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  color: ${(props) => (props.selected ? '#3B1198' : '#777777')};
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60px;
  height: 30px;
  letter-spacing: -1px;
`;

const Dropdown = ({ items, onChange }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(items[0]);
  const [scroll, setScroll] = useState(0);

  const listRef = useRef();

  const onSelect = (i) => {
    setSelected(i);
    onChange(i);
    setOpen(false);
  };

  useEffect(() => {
    if (open && !scroll) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
      setScroll(true);
    }
  }, [open, scroll]);

  return (
    <>
      <Wrapper>
        <List visible={open}>
          <ListInner ref={listRef}>
            {_.map(_.range(1, 100).reverse(), (i) => (
              <Item selected={selected === i} onClick={() => onSelect(i)}>
                {i}
              </Item>
            ))}
          </ListInner>
          <Inner onClick={() => setOpen(!open)}>
            수량 {selected} 개 <GoTriangleDown />
          </Inner>
        </List>

        <Inner onClick={() => setOpen(!open)}>
          수량 {selected} 개 <GoTriangleDown />
        </Inner>
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
