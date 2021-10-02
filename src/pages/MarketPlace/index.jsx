import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { IonPage, IonContent } from '@ionic/react';
import { AiOutlineSearch, AiOutlineHeart } from 'react-icons/ai';

import {
  Header,
  ImageSlider,
  AltTab,
  Rank,
  TextField,
  ArtistGrid,
  CommentList,
  Navigation,
  Typography,
  Margin,
  Padding,
} from 'moby-ui';

const MarketPlace = () => {
  const history = useHistory();

  const dummyImageSlides = [
    'https://picsum.photos/300/300',
    'https://picsum.photos/300/300',
    'https://picsum.photos/300/300',
  ];

  const dummyRank = [
    {
      name: 'BTS | Butter Poster',
      isNew: true,
      status: 2,
      onClick: () => history.push('/rank'),
    },
    {
      name: 'NCT | RESONANCE PT2 Album',
      status: 0,
      onClick: () => history.push('/rank'),
    },
    {
      name: 'TWICE | More&More Poster',
      status: 1,
      onClick: () => history.push('/rank'),
    },
    {
      name: 'IU | LILAC Jacket',
      status: 2,
      onClick: () => history.push('/rank'),
    },
    {
      name: 'BTS | PERMISSION TO DANCE Poster',
      status: 2,
      onClick: () => history.push('/rank'),
    },
  ];

  const dummyArtists = Array.from(Array(19)).map((u, i) => ({
    image: `https://randomuser.me/api/portraits/men/${i}.jpg`,
    text: `ARIST ${i}`,
  }));

  const dummyComments = Array.from(Array(19)).map((u, i) => ({
    image: `https://randomuser.me/api/portraits/men/${i}.jpg`,
    name: '유저입니다',
    content: '이 한국의 아이돌은 유쾌한!',
    date: new Date(),
  }));

  return (
    <IonPage>
      <IonContent>
        <Header title="Market Place">
          <Margin size={4} />
          <Typography size={14}>NEW</Typography>
        </Header>

        <ImageSlider images={dummyImageSlides} />

        <Padding padding={17} top={15}>
          <AltTab tabs={['실시간 NFT 순위', '아티스트 순위']} />

          <Margin size={14} />

          <Rank items={dummyRank} />

          <Margin size={25} />

          <TextField placeholder="아티스트 검색" icon={<AiOutlineSearch />} />

          <Margin size={25} />

          <ArtistGrid>
            {_.map(dummyArtists, (artist) => (
              <ArtistGrid.Artist image={artist.image} text={artist.text} />
            ))}
          </ArtistGrid>

          <Margin size={36} />

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

export default MarketPlace;
