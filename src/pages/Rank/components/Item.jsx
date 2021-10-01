import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MdKeyboardArrowDown } from 'react-icons/md';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { CgLoadbar } from 'react-icons/cg';

import { Flex, Typography, Image, Margin, Divider, Box } from 'moby-ui';

const Wrapper = styled(Flex)`
  margin-bottom: 22px;
  height: ${(props) => (props.open ? 165 : 27)}px;
  overflow: hidden;
  transition: height 0.3s;
`;

const RankingBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 25px;
  width: 27px;
  height: 27px;
  border-radius: 5.5px;
  font-size: 14px;
  color: #ffffff;

  background-color: #cecece;
  ${(props) => props.rank === 1 && 'background-color: #3b1198;'}
  ${(props) => props.rank === 2 && 'background-color: #6A50B0;'}
  ${(props) => props.rank === 3 && 'background-color: #927DC5;'}
  ${(props) => props.rank === 4 && 'background-color: #CCC3E4;'}
  ${(props) => props.rank === 5 && 'background-color: #CCC3E4;'}
`;

const InformWrapper = styled.div`
  flex-grow: 1;
`;

const InformHeader = styled(Flex)`
  flex-grow: 1;
  padding: 5px 0 10px 0;
`;

const Status = styled.div`
  margin-top: 4px;
  margin-right: 7px;
  font-size: 10px;
  font-weight: bold;
  color: #d8094e;
`;

const New = styled.div`
  font-size: 6px;
  font-weight: bold;
  color: #d8094e;
`;

const ItemImage = styled(Image)`
  margin-right: 19px;
  min-width: 115px;
  height: 115px;
`;

const Item = ({
  rank,
  name,
  status,
  isNew,
  image,
  sales,
  likes,
  clicks,
  defaultOpen,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Wrapper open={open}>
      <RankingBadge rank={rank}>{rank}</RankingBadge>
      <InformWrapper>
        <InformHeader
          justify="space-between"
          align="center"
          onClick={() => setOpen(!open)}
        >
          <Flex align="center">
            <Typography size={13}>{name}</Typography>
            <Margin size={16} />
            <Status>
              {status === 0 && <CgLoadbar />}
              {status === 1 && <AiFillCaretDown />}
              {status === 2 && <AiFillCaretUp />}
            </Status>
            {isNew && <New>NEW</New>}
          </Flex>
          <div>
            <MdKeyboardArrowDown />
          </div>
        </InformHeader>

        <Divider />

        <Margin size={13} />

        <Flex align="center">
          <ItemImage image={image} />
          <Flex direction="column">
            <Flex align="center" justify="space-between">
              <Box width={48}>
                <Flex align="center" justify="space-between">
                  <Typography size={10} color="#4C4C4C">
                    판매량
                  </Typography>
                  <Divider size={10} vertical />
                </Flex>
              </Box>
              <Typography size={13} weight="bold">
                {sales.toLocaleString()}
              </Typography>
            </Flex>
            <Margin size={13} />
            <Flex align="center" justify="space-between">
              <Box width={48}>
                <Flex align="center" justify="space-between">
                  <Typography size={10} color="#4C4C4C">
                    좋아요
                  </Typography>
                  <Divider size={10} vertical />
                </Flex>
              </Box>
              <Typography size={13} weight="bold">
                {likes.toLocaleString()}
              </Typography>
            </Flex>
            <Margin size={13} />
            <Flex align="center" justify="space-between">
              <Box width={48}>
                <Flex align="center" justify="space-between">
                  <Typography size={10} color="#4C4C4C">
                    노출클릭
                  </Typography>
                  <Divider size={10} vertical />
                </Flex>
              </Box>
              <Typography size={13} weight="bold">
                {clicks.toLocaleString()}
              </Typography>
            </Flex>
          </Flex>
        </Flex>
      </InformWrapper>
    </Wrapper>
  );
};

Item.propTypes = {
  rank: PropTypes.number,
  name: PropTypes.string,
  status: PropTypes.string,
  isNew: PropTypes.bool,
  image: PropTypes.string,
  sales: PropTypes.number,
  likes: PropTypes.number,
  clicks: PropTypes.number,
  defaultOpen: PropTypes.bool,
};

Item.defaultProps = {
  rank: 1,
  name: null,
  status: 0,
  isNew: false,
  image: null,
  sales: 0,
  likes: 0,
  clicks: 0,
  defaultOpen: false,
};

export default Item;
