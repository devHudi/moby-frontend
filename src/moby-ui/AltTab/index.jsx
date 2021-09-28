import { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import { Divider } from 'moby-ui';

const TabWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TabText = styled.div`
  text-align: center;
  color: ${(props) => (props.activated ? '#000000' : '#E6E6E6')};
  font-size: 14px;
`;

const DividerWrapper = styled.div`
  padding: 0 20px;
`;

const AltTab = ({ tabs, onChange }) => {
  const [selected, setSelected] = useState(0);

  const onTabClick = (i) => {
    setSelected(i);
    onChange(i);
  };

  return (
    <TabWrapper>
      {_.map(tabs, (text, i) => (
        <>
          <TabText activated={selected === i} onClick={() => onTabClick(i)}>
            {text}
          </TabText>
          {i < tabs.length - 1 && (
            <DividerWrapper>
              <Divider vertical size={17} />
            </DividerWrapper>
          )}
        </>
      ))}
    </TabWrapper>
  );
};

AltTab.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};

AltTab.defaultProps = {
  tabs: [],
  onChange: (i) => {
    console.log(`Tab changed ${i}`);
  },
};

export default AltTab;
