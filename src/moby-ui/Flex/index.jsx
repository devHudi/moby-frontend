import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  justify-content: ${(props) => props.justify || "flex-start"};
  align-items: ${(props) => props.align || "flex-start"};
  flex-direction: ${(props) => props.direction || "row"};
  width: 100%;
  height: ${(props) => (props.fullHeight ? "100%" : "auto")};
`;

export default Flex;
