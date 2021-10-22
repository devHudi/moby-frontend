import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Typography, Margin } from 'moby-ui';

const Dimmer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  height: 160px;
  background-color: #ffffff;
  border-radius: 14px;
  font-size: 15px;
`;

const ButtonGroup = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 45px;
  border-top: 1px solid #707070;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
`;

const Button = styled.button`
  flex-basis: 50%;
  background-color: transparent;
  border: none;
  font-size: 16px;
  color: #7334e4;

  &:first-child {
    border-right: 1px solid #707070;
  }
`;

const Modal = ({ title, children, onConfirm, onCancel }) => (
  <Dimmer>
    <Wrapper>
      <Margin size={20} />
      <Typography size={13} color="#7334e4">
        {title}
      </Typography>

      <Margin size={25} />
      {children}

      <ButtonGroup>
        <Button onClick={onConfirm}>확인</Button>
        <Button onClick={onCancel}>취소</Button>
      </ButtonGroup>
    </Wrapper>
  </Dimmer>
);

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

Modal.defaultProps = {
  title: '',
  children: null,
  onConfirm: () => {},
  onCancel: () => {},
};

export default Modal;
