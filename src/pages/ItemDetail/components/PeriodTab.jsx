import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 10px 0;
  padding: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #b192f1;
  border-radius: 30px;
`;

const TabItem = styled.div`
  margin: 0 5px;
  padding: 7px;
  flex-basis: 18%;
  border-radius: 30px;
  background-color: ${(props) => (props.activated ? '#5000df' : 'transparent')};
`;

const TabText = styled.div`
  text-align: center;
  font-size: 10px;
  color: #ffffff;
`;

const DividerWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 2.5%;
`;

const Divider = styled.div`
  height: 14px;
  border-left: 1px solid #ffffff;
`;

const PeriodTab = ({ onChange }) => {
  const [tab, setTab] = useState(0);

  const onTabClick = (i) => {
    setTab(i);
    onChange(i);
  };

  return (
    <Wrapper>
      <TabItem activated={tab === 0} onClick={() => onTabClick(0)}>
        <TabText>1개월</TabText>
      </TabItem>
      <DividerWrapper>
        <Divider />
      </DividerWrapper>
      <TabItem activated={tab === 1} onClick={() => onTabClick(1)}>
        <TabText>3개월</TabText>
      </TabItem>
      <DividerWrapper>
        <Divider />
      </DividerWrapper>
      <TabItem activated={tab === 2} onClick={() => onTabClick(2)}>
        <TabText>6개월</TabText>
      </TabItem>
      <DividerWrapper>
        <Divider />
      </DividerWrapper>
      <TabItem activated={tab === 3} onClick={() => onTabClick(3)}>
        <TabText>1년</TabText>
      </TabItem>
      <DividerWrapper>
        <Divider />
      </DividerWrapper>
      <TabItem activated={tab === 4} onClick={() => onTabClick(4)}>
        <TabText>전체</TabText>
      </TabItem>
    </Wrapper>
  );
};

PeriodTab.propTypes = {
  onChange: PropTypes.func,
};

PeriodTab.defaultProps = {
  onChange: (i) => console.log(`Tab Changed ${i}`),
};

export default PeriodTab;
