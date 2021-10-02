import { useState } from 'react';
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 30px;
  border: 2px solid #3b1198;
  border-radius: 30px;
  font-size: 11px;
  color: #3b1198;
`;

const Inner = styled.div`
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Dropdown = ({ items, onChange }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(items[0]);

  const onSelect = (i) => {
    setSelected(i);
    onChange(i);
  };

  return (
    <>
      <IonModal isOpen={open}>
        <IonList>
          <IonRadioGroup
            value={selected}
            onIonChange={(e) => onSelect(e.detail.value)}
          >
            <IonListHeader>
              <IonLabel>수량 선택</IonLabel>
            </IonListHeader>

            {_.map(items, (i) => (
              <IonItem>
                <IonLabel>{i}개</IonLabel>
                <IonRadio value={i} />
              </IonItem>
            ))}
          </IonRadioGroup>
        </IonList>
        <IonButton fill="clear" onClick={() => setOpen(false)}>
          확인
        </IonButton>
      </IonModal>
      <Wrapper onClick={() => setOpen(!open)}>
        <Inner>
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
