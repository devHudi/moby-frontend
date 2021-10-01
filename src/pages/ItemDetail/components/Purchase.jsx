import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 90px;
  background-color: #ffffff;
  border-top: 1px solid #3b1198;
  z-index: 100;
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-basis: 25%;
`;

const MenuText = styled.div`
  font-size: 8px;
  letter-spacing: -1px;
  color: #ffffff;
`;

const Navigation = () => {
  const history = useHistory();

  return <Wrapper>Empty Yet</Wrapper>;
};

export default Navigation;
