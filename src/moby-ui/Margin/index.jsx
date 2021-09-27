import styled from 'styled-components';

const Margin = styled.div`
  height: ${(props) => props.size || 10}px;
  width: ${(props) => props.size || 10}px;
`;

export default Margin;
