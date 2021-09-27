import styled from "styled-components";

const TextField = styled.input`
  display: flex;
  padding: ${(props) => (props.underline ? "12px 10px" : "14px 25px")};
  width: ${(props) => props.width || "100%"};
  border: 1px solid #000000;
  border-top-width: ${(props) => (props.underline ? 0 : 1)};
  border-left-width: ${(props) => (props.underline ? 0 : 1)};
  border-right-width: ${(props) => (props.underline ? 0 : 1)};
  border-radius: ${(props) => (props.underline ? 0 : "50px")};
  background-color: transparent;
  font-size: 11px;
`;

export default TextField;
