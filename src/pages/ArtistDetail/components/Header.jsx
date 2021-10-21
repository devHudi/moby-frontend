import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex, Divider, Typography, Margin, Padding, Heart } from 'moby-ui';

const Icon = styled.div`
  position: relative;
  top: 2px;
`;

const Label = styled(Typography)`
  flex-basis: 100px;
`;

const Value = styled(Typography)`
  flex-grow: 1;
`;

const Header = ({ agency, marketCap, tradingVolume, heart, onHeartChange }) => (
  <>
    <Padding padding={33} top={16} bottom={18}>
      <Flex justify="space-between" align="center">
        <Icon>
          <Heart filled={heart} onChange={onHeartChange} />
        </Icon>
        <Value size={14} align="right">
          {agency}
        </Value>
      </Flex>

      <Margin size={12} />
      <Divider />
      <Margin size={18} />

      <Flex justify="space-between" align="center">
        <Label size={14} weight="bold">
          NFT 시가총액
        </Label>
        <Divider vertical size={18} />
        <Value size={14} align="right">
          {marketCap.toLocaleString()}
        </Value>
      </Flex>

      <Margin size={18} />

      <Flex justify="space-between" align="center">
        <Label size={14} weight="bold">
          NFT 거래량
        </Label>
        <Divider vertical size={18} />
        <Value size={14} align="right">
          {tradingVolume.toLocaleString()}
        </Value>
      </Flex>
    </Padding>
    <Divider />
  </>
);

Header.propTypes = {
  agency: PropTypes.string,
  marketCap: PropTypes.number,
  tradingVolume: PropTypes.number,
  heart: PropTypes.bool,
  onHeartChange: PropTypes.func,
};

Header.defaultProps = {
  agency: '',
  marketCap: 0,
  tradingVolume: 0,
  heart: false,
  onHeartChange: () => {},
};

export default Header;
