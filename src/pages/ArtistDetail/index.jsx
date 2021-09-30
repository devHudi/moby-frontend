import _ from 'lodash';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { IonPage, IonContent } from '@ionic/react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';

import {
  Margin,
  Padding,
  Flex,
  Typography,
  TextField,
  CommentList,
  AltHeader,
  Navigation,
  HScroll,
  ItemCard,
} from 'moby-ui';

import Header from './components/Header';

const dummyItems = [
  {
    image: 'http://placehold.it/300x300',
    name: 'test',
    type: 'official',
    price: 30000,
    onHeartClick: () => {},
  },
  {
    image: 'http://placehold.it/300x300',
    name: 'test',
    type: 'community',
    price: 30000,
    onHeartClick: () => {},
  },
  {
    image: 'http://placehold.it/300x300',
    name: 'test',
    type: 'official',
    price: 30000,
    onHeartClick: () => {},
  },
];

const dummyComments = Array.from(Array(19)).map((u, i) => ({
  image: `https://randomuser.me/api/portraits/men/${i}.jpg`,
  name: '유저입니다',
  content: '이 한국의 아이돌은 유쾌한!',
  date: new Date(),
}));

const Thumb = styled.div`
  height: 237px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center center;
`;

const ArtistDetail = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent>
        <AltHeader title="BTS" onBackClick={() => history.goBack()} />

        <Thumb image="http://placehold.it/300x300" />

        <Header
          agency="HYBE Entertainment"
          marketCap={6230000}
          tradingVolume={12341235}
        />

        <Padding padding={18}>
          <Typography size={14} weight="bold">
            <Flex align="center">
              상품 리스트 <MdKeyboardArrowRight />
            </Flex>
          </Typography>
          <Margin size={20} />
          <HScroll>
            {_.map(dummyItems, (item) => (
              <ItemCard
                image={item.image}
                name={item.name}
                type={item.type}
                price={item.price}
                onHeartClick={item.onHeartClick}
              />
            ))}
          </HScroll>
        </Padding>

        <Padding>
          <TextField
            placeholder="아티스트를 위한 응원의 댓글을 남겨주세요!"
            icon={<AiOutlineHeart />}
          />

          <Margin size={21} />

          <CommentList>
            {_.map(dummyComments, (comment) => (
              <CommentList.Comment
                image={comment.image}
                name={comment.name}
                content={comment.content}
              />
            ))}
          </CommentList>
        </Padding>

        <Navigation />
        <Margin size={90} />
      </IonContent>
    </IonPage>
  );
};

export default ArtistDetail;
