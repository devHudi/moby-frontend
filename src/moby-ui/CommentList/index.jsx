import PropTypes from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useIonToast } from '@ionic/react';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { Flex, Margin, Divider } from 'moby-ui';

const CommentWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  &:nth-last-child(2) {
    margin: 0;
  }
`;

const CommentImageWrapper = styled.div`
  flex-basis: 35px;
  align-items: center;
`;

const CommentContentWrapper = styled.div`
  flex-grow: 1;
  margin-left: 10px;
  align-items: center;
`;

const UserProfile = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 99px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

const CommentName = styled.div`
  font-size: 11px;
`;

const CommentDate = styled.div`
  margin-top: -3px;
  margin-left: 10px;
  font-size: 9px;
  color: #888888;
`;

const CommentReport = styled.div`
  flex-basis: 40px;
  font-size: 11px;
  text-align: right;
  color: #888888;
`;

const CommentContent = styled.div`
  font-size: 11px;
`;

const MoreButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
`;

const Comment = ({ image, name, content, date }) => {
  const [present, dismiss] = useIonToast();

  const onToast = () => {
    present({
      buttons: [{ text: '확인', handler: () => dismiss() }],
      duration: 2000,
      message: '해당 기능은 추후 제공될 예정입니다.',
    });
  };

  return (
    <CommentWrapper>
      <CommentImageWrapper>
        <UserProfile image={image} />
      </CommentImageWrapper>
      <CommentContentWrapper>
        <Flex>
          <Flex align="center">
            <CommentName>{name}</CommentName>
            <CommentDate>{dayjs(date).format('YYYY.MM.DD')}</CommentDate>
          </Flex>

          <CommentReport onClick={onToast}> 신고 </CommentReport>
        </Flex>
        <Margin size={5} />
        <CommentContent>{content}</CommentContent>
      </CommentContentWrapper>
    </CommentWrapper>
  );
};

Comment.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.objectOf(Date),
};

Comment.defaultProps = {
  image: null,
  name: '',
  content: '',
  date: new Date(),
};

const CommentListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentList = ({ children, onMoreClick }) => (
  <CommentListWrapper>
    <Divider />
    <Margin size={15} />

    {children}

    <MoreButton onClick={onMoreClick}>
      <MdKeyboardArrowDown />
    </MoreButton>
    <Divider />
  </CommentListWrapper>
);

CommentList.Comment = Comment;

CommentList.propTypes = {
  children: PropTypes.node,
  onMoreClick: PropTypes.func,
};

CommentList.defaultProps = {
  children: null,
  onMoreClick: () => console.log('Load More'),
};

export default CommentList;
