import styled from 'styled-components';
import { useIonToast } from '@ionic/react';

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
  transition: background-color 0.2s;
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

const PeriodTab = () => {
  const [present, dismiss] = useIonToast();

  const onToast = () => {
    present({
      buttons: [{ text: '확인', handler: () => dismiss() }],
      duration: 2000,
      message: '거래 데이터가 1개월 이상 존재하지 않습니다.',
    });
  };

  return (
    <Wrapper>
      <TabItem activated>
        <TabText>1개월</TabText>
      </TabItem>
      <DividerWrapper>
        <Divider />
      </DividerWrapper>
      <TabItem onClick={onToast}>
        <TabText>3개월</TabText>
      </TabItem>
      <DividerWrapper>
        <Divider />
      </DividerWrapper>
      <TabItem onClick={onToast}>
        <TabText>6개월</TabText>
      </TabItem>
      <DividerWrapper>
        <Divider />
      </DividerWrapper>
      <TabItem onClick={onToast}>
        <TabText>1년</TabText>
      </TabItem>
      <DividerWrapper>
        <Divider />
      </DividerWrapper>
      <TabItem onClick={onToast}>
        <TabText>전체</TabText>
      </TabItem>
    </Wrapper>
  );
};

export default PeriodTab;
