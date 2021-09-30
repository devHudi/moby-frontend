import styled from 'styled-components';

const Image = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  height: ${(props) => `${props.height}px` || '200px'};
`;

export default Image;
