import PropTypes from "prop-types";
import styled from "styled-components";
import dayjs from "dayjs";
import { Flex, TextField, Margin } from "moby-ui";

const CommentWrapper = styled.div`
  position: relative;
  display: flex;
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
  margin-left: 10px;
  font-size: 9px;
  color: #888888;
`;

const CommentReport = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 11px;
  color: #888888;
`;

const CommentContent = styled.div`
  font-size: 11px;
`;

const Comment = ({ image, name, content, date, onReportClick }) => {
  return (
    <CommentWrapper>
      <Flex align="center">
        <CommentImageWrapper>
          <UserProfile image={image} />
        </CommentImageWrapper>
        <CommentContentWrapper>
          <Flex>
            <Flex align="center">
              <CommentName>{name}</CommentName>
              <CommentDate>{dayjs(date).format("YYYY.MM.DD")}</CommentDate>
            </Flex>
            <CommentReport onClick={onReportClick}> 신고 </CommentReport>
          </Flex>
          <CommentContent>{content}</CommentContent>
        </CommentContentWrapper>
      </Flex>
    </CommentWrapper>
  );
};

Comment.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.objectOf(Date),
  onReportPress: PropTypes.func,
};

Comment.defaultProps = {
  image: null,
  name: "",
  content: "",
  date: new Date(),
  onReportPress: () => console.log("Report"),
};

const CommentListWrapper = styled.div``;

const CommentList = ({ placeholder, children }) => {
  return (
    <CommentListWrapper>
      <TextField placeholder={placeholder} />
      <Margin size={25} />
      {children}
    </CommentListWrapper>
  );
};

CommentList.Comment = Comment;

CommentList.propTypes = {
  placeholder: PropTypes.string,
  children: PropTypes.node,
};

CommentList.defaultProps = {
  placeholder: "",
  children: null,
};

export default CommentList;
