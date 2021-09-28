import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';

import { MdKeyboardArrowDown } from 'react-icons/md';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { CgLoadbar } from 'react-icons/cg';

const ItemWrapper = styled.div`
  position: ${(props) => props.position};
  display: flex;
  align-items: center;
  height: 27px;
  padding: 0 10px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: translateY(${(props) => (props.visible ? 0 : '50px')});
  transition: opacity 0.1s, transform 0.7s;
`;

const RankingBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 25px;
  width: 27px;
  height: 27px;
  background-color: #3b1198;
  border-radius: 5.5px;
  font-size: 14px;
  color: #ffffff;
`;

const Name = styled.div`
  margin-right: 16px;
  font-size: 13px;
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

const Item = ({ ranking, name, isNew, position, status, visible, onClick }) => (
  <ItemWrapper visible={visible} position={position} onClick={onClick}>
    <RankingBadge>{ranking}</RankingBadge>
    <Name>{name}</Name>
    <Status>
      {status === 0 && <CgLoadbar />}
      {status === 1 && <AiFillCaretDown />}
      {status === 2 && <AiFillCaretUp />}
    </Status>
    {isNew && <New>NEW</New>}
  </ItemWrapper>
);

Item.propTypes = {
  ranking: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isNew: PropTypes.bool,
  status: PropTypes.number,
  position: PropTypes.oneOf(['absolute', 'relative']),
  visible: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

Item.defaultProps = {
  isNew: false,
  status: 0,
  position: 'absolute',
  onClick: () => console.log('Rank Click'),
};

const Wrapper = styled.div`
  position: relative;
  padding: 10px 0;
  height: 51px;
  border-top: 1px solid #7f7f7f;
`;

const RankWrapper = styled.div`
  position: relative;
  height: 37px;
  overflow: hidden;
  border-bottom: 1px solid #7f7f7f;
`;

const OpenRankWrapper = styled.div`
  position: absolute;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  border-bottom: 1px solid #7f7f7f;
  z-index: 98;

  & ${ItemWrapper} {
    position: relative;
    margin-bottom: 18px;
  }
`;

const FoldButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 27px;
  height: 27px;
  z-index: 99;
  transform: rotate(${(props) => (props.reverse ? '0deg' : '180deg')});
  transition: transform 0.3s;
`;

const Rank = ({ items }) => {
  const [intervalFlag, setIntervalFlag] = useState(false);
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const [folded, setFolded] = useState(true);

  useEffect(() => {
    if (intervalFlag) return;

    setIntervalFlag(true);

    setInterval(() => {
      if (currentRef.current === items.length - 1) {
        currentRef.current = 0;
        setCurrent(0);
      } else setCurrent((currentRef.current += 1));
    }, 5000);
  }, [intervalFlag, current, items.length]);

  return (
    <Wrapper>
      {folded && (
        <RankWrapper>
          {_.map(items, (item, i) => (
            <Item
              key={i}
              ranking={i + 1}
              name={item.name}
              isNew={item.isNew}
              status={item.status}
              visible={i === current}
              onClick={item.onClick}
            />
          ))}
        </RankWrapper>
      )}

      {!folded && (
        <OpenRankWrapper>
          {_.chain(items)
            .map((item, i) => (
              <Item
                key={{ item, i }}
                ranking={i + 1}
                name={item.name}
                status={item.status}
                isNew={item.isNew}
                onClick={item.onClick}
                visible
              />
            ))
            .slice(0, 5)
            .value()}
        </OpenRankWrapper>
      )}

      <FoldButton reverse={folded} onClick={() => setFolded(!folded)}>
        <MdKeyboardArrowDown />
      </FoldButton>
    </Wrapper>
  );
};

Rank.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      isNew: PropTypes.bool,
      status: PropTypes.oneOf([0, 1, 2]),
      onClick: PropTypes.func,
    }),
  ),
};

Rank.defaultProps = {
  items: [],
};

export default Rank;
