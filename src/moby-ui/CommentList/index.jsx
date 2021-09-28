import PropTypes from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { Flex, TextField, Margin } from 'moby-ui';

const CommentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
`;

const CommentImageWrapper = styled.div`
  flex-basis: 35px;
  align-items: center;
`;

const CommentContentWrapper = styled.div`
  flex-shrink: 1;
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
  margin-top: -2px;
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
  margin-top: 10px;
  height: 30px;
`;

const Comment = ({
  image,
  name,
  content,
  date,
  onReportClick,
  onMoreClick,
}) => (
  <CommentWrapper>
    <Flex align="center">
      <CommentImageWrapper>
        <UserProfile image={image} />
      </CommentImageWrapper>
      <CommentContentWrapper>
        <Flex>
          <Flex align="center">
            <CommentName>{name}</CommentName>
            <CommentDate>{dayjs(date).format('YYYY.MM.DD')}</CommentDate>
          </Flex>

          <CommentReport onClick={onReportClick}> 신고 </CommentReport>
        </Flex>
        <Margin size={5} />
        <CommentContent>{content}</CommentContent>
      </CommentContentWrapper>
    </Flex>

    <MoreButton onClick={onMoreClick}>
      <MdKeyboardArrowDown />
    </MoreButton>
  </CommentWrapper>
);

Comment.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.objectOf(Date),
  onReportClick: PropTypes.func,
  onMoreClick: PropTypes.func,
};

Comment.defaultProps = {
  image: null,
  name: '',
  content: '',
  date: new Date(),
  onReportClick: () => console.log('Report'),
  onMoreClick: () => console.log('Load More'),
};

const CommentListWrapper = styled.div``;

const CommentList = ({ placeholder, children }) => (
  <CommentListWrapper>
    <TextField placeholder={placeholder} />
    <Margin size={25} />
    {children}
  </CommentListWrapper>
);

CommentList.Comment = Comment;

CommentList.propTypes = {
  placeholder: PropTypes.string,
  children: PropTypes.node,
};

CommentList.defaultProps = {
  placeholder: '',
  children: null,
};

export default CommentList;
