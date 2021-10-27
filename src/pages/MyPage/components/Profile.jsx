import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography, Margin, Image, Flex } from 'moby-ui';

const Wrapper = styled(Flex)`
  padding: 28px 26px;
  background: linear-gradient(90deg, #644aad, #7446e5);
`;

const RightWrapper = styled(Flex)`
  border-left: 1px solid #ffffff;
  max-width: 100px;
`;

const ProfileImage = styled(Image)`
  margin-right: 17px;
  flex-basis: 93px;
  min-width: 93px;
  height: 93px;
  border-radius: 50px;
`;

const Number = styled.div`
  padding: 4px 14px;
  background-color: #ffffff;
  border-radius: 99px;
  color: #7335e3;
  font-size: 12px;
  font-weight: bold;
`;

const Profile = ({
  thumbnailSrc,
  name,
  email,
  favArtistName,
  holding,
  balance,
  onClick,
}) => (
  <Wrapper align="center">
    <Flex align="center">
      <ProfileImage image={thumbnailSrc} onClick={onClick} />
      <Flex direction="column">
        <Typography size={15} weight="bold" color="#ffffff">
          {name}
        </Typography>
        <Typography size={9} color="#ffffff">
          {email}
        </Typography>
        <Margin size={17} />

        <Typography size={10} color="#ffffff">
          MY 아티스트 | {favArtistName}
        </Typography>
      </Flex>
    </Flex>
    <RightWrapper direction="column" align="flex-end">
      <Typography size={12} weight="bold" color="#ffffff">
        보유 NFT 수량
      </Typography>
      <Margin size={6} />

      <Number>{holding}</Number>
      <Margin size={14} />

      <Typography size={12} weight="bold" color="#ffffff">
        MOBY PAY 잔액
      </Typography>
      <Margin size={6} />

      <Number>{balance.toLocaleString()}원</Number>
    </RightWrapper>
  </Wrapper>
);

Profile.propTypes = {
  thumbnailSrc: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  favArtistName: PropTypes.string,
  holding: PropTypes.number,
  balance: PropTypes.number,
  onClick: PropTypes.func,
};

Profile.defaultProps = {
  thumbnailSrc: '',
  name: '',
  email: '',
  favArtistName: '',
  holding: 0,
  balance: 0,
  onClick: () => {},
};

export default Profile;
