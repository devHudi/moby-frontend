import styled from 'styled-components';

const Typography = styled.div`
  font-size: ${(props) => `${props.size}px` || '16px'};
  font-weight: ${(props) => props.weight || 'normal'};
  text-align: ${(props) => props.align || 'left'};
`;

export default Typography;
