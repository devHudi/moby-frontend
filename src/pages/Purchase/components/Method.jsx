import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography, Flex, Margin, Divider } from 'moby-ui';
import { BiCheck } from 'react-icons/bi';

import mobyDefault from '../images/moby-default.png';
import mobyActivated from '../images/moby-activated.png';

const Icon = styled.div`
  margin-right: 12px;
  position: relative;
  top: 2px;
  font-size: 17px;
`;

const ChargeBadge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 20px;
  background-color: ${(props) => (props.activated ? '#ffffff' : '#DBDBDB')};
  border-radius: 10px;
  color: ${(props) => (props.activated ? '#7334E4' : '#ffffff')};
  font-size: 9px;
`;

const CheckWrapper = styled.div`
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background-color: ${(props) => (props.activated ? '#ffffff' : '#DBDBDB')};
  color: ${(props) => (props.activated ? '#7334E4' : '#ffffff')};
  border-radius: 10px;
`;

const Header = ({ icon, name, activated, charge }) => (
  <Flex justify="space-between">
    <Flex align="center">
      <Icon activated={activated}>{icon}</Icon>
      <Typography color={activated && '#ffffff'} size={13}>
        {name}
      </Typography>
    </Flex>
    <Flex justify="flex-end">
      {charge && <ChargeBadge activated={activated}>충전</ChargeBadge>}
      <CheckWrapper activated={activated}>
        <BiCheck />
      </CheckWrapper>
    </Flex>
  </Flex>
);

Header.propTypes = {
  icon: PropTypes.node,
  name: PropTypes.string,
  charge: PropTypes.bool,
};

Header.defaultProps = {
  icon: null,
  name: null,
  charge: false,
};

const Wrapper = styled.div`
  margin-bottom: 10px;
  padding: 13px 20px;
  border-radius: 10px;
  border: 1px solid ${(props) => (props.activated ? 'transparent' : '#DBDBDB')};
  background-color: ${(props) => (props.activated ? '#7334E4' : '#ffffff')};
`;

const MobyIcon = styled.img`
  position: relative;
  top: -2px;
  width: 11px;
`;

const Method = ({ icon, name, activated, mobyPay, balance, onClick }) => {
  if (mobyPay) {
    return (
      <Wrapper activated={activated} onClick={onClick}>
        <Header
          icon={
            activated ? (
              <MobyIcon src={mobyActivated} />
            ) : (
              <MobyIcon src={mobyDefault} />
            )
          }
          name="MOBY PAY"
          activated={activated}
          charge
        />
        <Margin size={35} />
        <Flex justify="space-between" align="flex-end">
          <Typography size={15} color={activated && '#ffffff'}>
            현재 잔액
          </Typography>
          <div>
            <Flex align="flex-end">
              <Typography
                size={26}
                weight="bold"
                color={activated && '#ffffff'}
              >
                {balance.toLocaleString()}
              </Typography>
              <Margin size={15} />
              <Typography size={15} color={activated && '#ffffff'}>
                KRW
              </Typography>
            </Flex>
          </div>
        </Flex>
        <Margin size={5} />
        <Divider color={activated ? '#ffffff' : '#000000'} />
        <Margin size={15} />
      </Wrapper>
    );
  }

  return (
    <Wrapper activated={activated} onClick={onClick}>
      <Header icon={icon} name={name} activated={activated} />
    </Wrapper>
  );
};

Method.propTypes = {
  mobyPay: PropTypes.bool,
  name: PropTypes.string,
  activated: PropTypes.bool,
  balance: PropTypes.number,
  onClick: PropTypes.func,
};

Method.defaultProps = {
  mobyPay: false,
  name: null,
  activated: false,
  balance: 0,
  onClick: () => console.log('Method Click'),
};

export default Method;
