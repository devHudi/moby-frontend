import styled from 'styled-components';
import MDSpinner from 'react-md-spinner';

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
  backdrop-filter: blur(2px);
  z-index: 1000;
`;

const Spinner = () => (
  <Dimmer>
    <MDSpinner singleColor="#ffffff" />
  </Dimmer>
);

export default Spinner;
