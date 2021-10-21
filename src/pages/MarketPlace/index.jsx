import { useState, useEffect, useCallback } from 'react';
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

import * as artistsApi from 'apis/artists';
import * as productsApi from 'apis/products';

const MarketPlace = () => {
  const history = useHistory();

  const [imageSlides, setImageSlides] = useState([]);

  const [nftRanking, setNftRanking] = useState([]);
  const [artistRanking, setArtistRanking] = useState([]);
  const [rankingTab, setRankingTab] = useState(0);

  const [keyword, setKeyword] = useState('');
  const [artists, setArtists] = useState([]);

  const [comments, setComments] = useState([]);
  const [commentPage, setCommentPage] = useState(1);

  const initArtists = useCallback(async () => {
    const jwt = localStorage.getItem('jwt');
    const { data } = await artistsApi.getAllArtist(jwt);

    setArtists(
      _.chain(data)
        .map((item) => ({
          id: item?.id,
          text: item?.name,
          image: item?.thumbnailSrc,
          onClick: () => history.push(`/artists/${item?.id}`),
        }))
        .slice(0, 18)
        .value(),
    );
  }, [history]);

  const searchArtists = useCallback(async () => {
    const jwt = localStorage.getItem('jwt');
    const { data } = await artistsApi.searchArtist(keyword, jwt);

    setArtists(
      _.chain(data)
        .map((item) => ({
          id: item?.id,
          text: item?.name,
          image: item?.thumbnailSrc,
          onClick: () => history.push(`/artists/${item?.id}`),
        }))
        .slice(0, 18)
        .value(),
    );
  }, [keyword, history]);

  const getComments = useCallback(async () => {
    const jwt = localStorage.getItem('jwt');
    const { data } = await artistsApi.getAllArtistCommentsWithPagenation(
      20,
      commentPage,
      jwt,
    );

    setComments([
      ...comments,
      ..._.map(data.comments, (item) => ({
        id: item?.id,
        image: item?.author?.profileImageSrc,
        name: item?.author?.username,
        content: item?.contents,
        date: item?.createdAt,
      })),
    ]);
  }, [commentPage]); // eslint-disable-line

  const getImageSlides = useCallback(async () => {
    const jwt = localStorage.getItem('jwt');
    const { data } = await productsApi.getRecentProduct(5, jwt);

    setImageSlides(
      _.map(data, (item) => ({
        image: item.posterSrc,
        onClick: () => history.push(`/items/${item.id}`),
      })),
    );
  }, [history]);

  const getNftRanking = useCallback(async () => {
    const jwt = localStorage.getItem('jwt');
    const { data } = await productsApi.getProductsWithRakings(5, 1, jwt);

    const isNews = [true, false, false, true, true];
    const statuses = [2, 2, 0, 2, 1];

    setNftRanking(
      _.map(data.products, (item, i) => ({
        name: item?.title,
        isNew: isNews[i],
        status: statuses[i],
        onClick: () => history.push('/rank'),
      })),
    );
  }, [history]);

  const getArtistRanking = useCallback(async () => {
    const jwt = localStorage.getItem('jwt');
    const { data } = await artistsApi.getArtistsWithRakings(5, 1, jwt);

    const isNews = [false, false, true, false, false];
    const statuses = [1, 0, 2, 1, 0];

    setArtistRanking(
      _.map(data.artists, (item, i) => ({
        name: item?.name,
        isNew: isNews[i],
        status: statuses[i],
        onClick: () => history.push('/rank'),
      })),
    );
  }, [history]);

  useEffect(() => {
    if (keyword === '') initArtists();
    else searchArtists(keyword);

    getImageSlides();
    getNftRanking();
    getArtistRanking();
  }, [
    keyword,
    initArtists,
    searchArtists,
    getImageSlides,
    getNftRanking,
    getArtistRanking,
  ]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <IonPage>
      <IonContent>
        <Header title="Market Place">
          <Margin size={4} />
          <Typography size={14}>NEW</Typography>
        </Header>

        <ImageSlider images={imageSlides} />

        <Padding padding={17} top={15}>
          <AltTab
            tabs={['실시간 NFT 순위', '아티스트 순위']}
            onChange={(tab) => setRankingTab(tab)}
          />

          <Margin size={14} />

          <Rank items={rankingTab === 0 ? nftRanking : artistRanking} />
          {/* <Rank items={nftRanking} /> */}

          <Margin size={25} />

          <TextField
            placeholder="아티스트 검색"
            icon={<AiOutlineSearch />}
            onChange={_.debounce((e) => setKeyword(e.target.value), 300)}
          />

          <Margin size={25} />

          <ArtistGrid>
            {_.map(artists, (artist) => (
              <ArtistGrid.Artist
                image={artist.image}
                text={artist.text}
                onClick={artist.onClick}
              />
            ))}
          </ArtistGrid>

          <Margin size={36} />

          <TextField
            placeholder="아티스트를 위한 응원의 댓글을 남겨주세요!"
            icon={<AiOutlineHeart />}
            disabled
          />

          <Margin size={21} />

          <CommentList onMoreClick={() => setCommentPage(commentPage + 1)}>
            {_.map(comments, (comment) => (
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
