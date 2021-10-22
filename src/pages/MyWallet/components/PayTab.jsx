import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import dayjs from 'dayjs';
import { useIonToast } from '@ionic/react';
import styled from 'styled-components';
import { Margin, Padding, Flex, Typography, Divider, HScroll } from 'moby-ui';

import Card from './Card';

import mobyIcon from '../images/moby-icon.png';

const Icon = styled.div`
  margin-right: 12px;
  position: relative;
  font-size: 17px;
`;

const ChargeBadge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  color: #7334e4;
  font-size: 9px;
`;

const Wrapper = styled.div`
  margin-bottom: 10px;
  padding: 13px 20px;
  background-color: #7334e4;
`;

const PayTab = ({ balance, cards }) => {
  const [present, dismiss] = useIonToast();

  const history = useHistory();

  const onToast = () => {
    present({
      buttons: [{ text: '확인', handler: () => dismiss() }],
      duration: 2000,
      message: '해당 기능은 추후 제공될 예정입니다.',
    });
  };

  return (
    <>
      <Wrapper activated>
        <Flex justify="space-between">
          <Flex align="center">
            <Icon activated>
              <img src={mobyIcon} />
            </Icon>
            <Typography color="#ffffff" size={13}>
              MOBY PAY
            </Typography>
          </Flex>
          <Flex justify="flex-end">
            <ChargeBadge activated onClick={onToast}>
              충전
            </ChargeBadge>
          </Flex>
        </Flex>
        <Margin size={35} />
        <Flex justify="flex-end" align="flex-end">
          <Typography size={26} weight="bold" color="#ffffff">
            {balance.toLocaleString()}
          </Typography>
          <Margin size={15} />
          <Typography size={15} color="#ffffff">
            KRW
          </Typography>
        </Flex>
        <Margin size={5} />
        <Divider color="#ffffff" />
        <Margin size={15} />
      </Wrapper>

      <Padding padding={16}>
        <Typography size={15} color="#3B1198" weight="bold">
          등록한 카드
        </Typography>
        <Margin size={15} />

        <HScroll>
          {_.map(cards, (card) => (
            <Card name={card.name} number={card.number} />
          ))}
          <Card isAdd onClick={() => history.push('/my-wallet/add-card')} />
        </HScroll>
        <Margin size={23} />

        <Divider />

        {_.map(cards, (card) => {
          const formattedNumber = String(card.number).replace(
            /(\d{4})(\d{4})(\d{4})(\d{2})/,
            '$1-$2-$3-$4',
          );

          return (
            <>
              <Padding padding={20} left={0} right={0}>
                <Flex justify="space-between">
                  <Flex>
                    <Typography size={13} weight="bold">
                      {card.name}
                    </Typography>
                  </Flex>
                  <Flex direction="column" align="flex-end">
                    <Typography size={13} color="#696969">
                      {formattedNumber}
                    </Typography>
                    <Typography size={13} color="#696969">
                      {dayjs(card.expireDate).format('MM/DD')}
                    </Typography>
                  </Flex>
                </Flex>
              </Padding>
              <Divider />
            </>
          );
        })}
      </Padding>
    </>
  );
};

PayTab.propTypes = {
  balance: PropTypes.number,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
      expireDate: PropTypes.instanceOf(Date),
    }),
  ),
};

PayTab.defaultProps = {
  balance: 0,
  cards: [],
};

export default PayTab;
