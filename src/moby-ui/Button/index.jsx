import styled from "styled-components";

export default styled.button`
  padding: 8px;
  width: ${(props) => `${props.width}px` || "100%"};
  background-color: #512cdf;
  color: #ffffff;
  font-size: 12px;
  border-radius: 99px;
`;
