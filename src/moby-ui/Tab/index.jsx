import { useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import styled from "styled-components";

const TabWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const TabItem = styled.div`
  flex-grow: 1;
`;

const TabPressable = styled.div`
  padding: 11px;
  border-bottom: 2px solid
    ${(props) => (props.activated ? "#7f7f7f" : "#E6E6E6")};
`;

const TabText = styled.div`
  text-align: center;
  color: ${(props) => (props.activated ? "#000000" : "#E6E6E6")};
  font-size: 8px;
`;

const Tab = ({ tabs, onChange }) => {
  const [selected, setSelected] = useState(0);

  const onTabClick = (i) => {
    setSelected(i);
    onChange(i);
  };

  return (
    <TabWrapper>
      {_.map(tabs, (text, i) => (
        <TabItem key={`${text}${i}`}>
          <TabPressable
            activated={selected === i}
            onClick={() => onTabClick(i)}
          >
            <TabText activated={selected === i}>{text}</TabText>
          </TabPressable>
        </TabItem>
      ))}
    </TabWrapper>
  );
};

Tab.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};

Tab.defaultProps = {
  tabs: [],
  onChange: (i) => {
    console.log(`Tab changed ${i}`);
  },
};

export default Tab;
