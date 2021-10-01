import styled from 'styled-components';

const Box = styled.div`
  width: ${(props) => `${props.width}px` || 'initial'};
  height: ${(props) => `${props.height}px` || 'initial'};
  flex-basis: ${(props) => `${props.width}px` || 'initial'};
`;

export default Box;
