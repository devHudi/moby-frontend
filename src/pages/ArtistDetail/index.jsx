import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import { useHistory, useParams } from 'react-router-dom';
import { IonPage, IonContent, useIonToast } from '@ionic/react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';

import {
  Margin,
  Padding,
  Flex,
  Typography,
  TextField,
  Image,
  CommentList,
  AltHeader,
  Navigation,
  HScroll,
  ItemCard,
} from 'moby-ui';

import * as usersApi from 'apis/users';
import * as artistsApi from 'apis/artists';
import * as productsApi from 'apis/products';

import Header from './components/Header';

const ArtistDetail = () => {
  const history = useHistory();
  const { artistId } = useParams();

  const [bestArtistName, setBestArtistName] = useState('');
  const [artistHeart, setAritstHeart] = useState(false);

  const [artist, setAritst] = useState({
    name: '',
    poster: '',
    agency: '',
    marketCap: 0,
    tradingVolume: 0,
  });

  const [products, setProducts] = useState([]);

  const [comments, setComments] = useState([]);

  const [commentPage, setCommentPage] = useState(1); // eslint-disable-line
  // API 에서 아티스트 상세에서 댓글 페이징을 아직 지원하지 않음

  const [commentInput, setCommentInput] = useState('');

  const [present, dismiss] = useIonToast();
  const showError = useCallback(() => {
    present({
      buttons: [{ text: '확인', handler: () => dismiss() }],
      duration: 2000,
      message: '알 수 없는 에러가 발생하였습니다.',
    });
  }, [present, dismiss]);

  const getBestArtistName = useCallback(async () => {
    const jwt = localStorage.getItem('jwt');
    const { data } = await usersApi.getCurrentUser(jwt);
    setBestArtistName(data?.user?.bestOfArtistName);

    setAritstHeart(bestArtistName && bestArtistName === artist.name);
  }, [bestArtistName, artist.name]);

  const toggleBestArtist = useCallback(async () => {
    const jwt = localStorage.getItem('jwt');
    if (bestArtistName === artist.name) {
      setAritstHeart(false);
      await usersApi.deleteBestArtist(jwt);
    } else {
      setAritstHeart(true);
      await usersApi.pickBestArtist(artistId, jwt);
    }
  }, [bestArtistName, artist.name, artistId]);

  const getArtist = useCallback(async () => {
    const jwt = localStorage.getItem('jwt');
    const { data } = await artistsApi.getArtistDetail(artistId, jwt);

    setAritst({
      name: data?.name,
      poster: data?.posterSrc,
      agency: data?.belong,
      marketCap: data?.marketCap,
      tradingVolume: data?.tradingVolume,
    });
  }, [artistId]);

  const getProducts = useCallback(async () => {
    const jwt = localStorage.getItem('jwt');
    const { data } = await productsApi.getProductByArtistId(artistId, jwt);

    setProducts(
      _.map(data, (item) => ({
        id: item?.id,
        image: item?.posterSrc,
        name: item?.title,
        type: item?.isOfficial ? 'official' : 'community',
        price: item?.currentPrice,
        onClick: () => history.push(`/items/${item?.id}`),
        onHeartClick: () => {},
      })),
    );
  }, [artistId, history]);

  const createComment = useCallback(
    async (e) => {
      if (e.keyCode === 13) {
        const jwt = localStorage.getItem('jwt');
        try {
          await artistsApi.commentArtist(artistId, commentInput, jwt);

          setCommentInput('');

          const { data } = await artistsApi.getAllArtistCommentsWithPagenation(
            1,
            1,
            jwt,
          );
          setComments([
            {
              id: data?.comments[0]?.id,
              image: data?.comments[0]?.author?.profileImageSrc,
              name: data?.comments[0]?.author?.username,
              content: data?.comments[0]?.contents,
              date: data?.comments[0]?.createdAt,
            },
            ...comments,
          ]);
        } catch {
          showError();
        }
      }
    },
    [commentInput, artistId, showError], // eslint-disable-line
  );

  const getComments = useCallback(
    async () => {
      const jwt = localStorage.getItem('jwt');
      const { data } = await artistsApi.getCommentsByArtist(artistId, jwt);

      setComments(
        _.chain(data)
          .map((item) => ({
            id: item?.id,
            image: item?.author?.profileImageSrc,
            name: item?.author?.username,
            content: item?.contents,
            date: item?.createdAt,
          }))
          .reverse()
          .value(),
      );
    },
    [commentPage, artistId], // eslint-disable-line
  );

  useEffect(() => {
    getArtist();
    getProducts();
    getBestArtistName();
  }, [getArtist, getProducts, getBestArtistName]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <IonPage>
      <IonContent>
        <AltHeader title={artist?.name} onBackClick={() => history.goBack()} />

        <Image height={237} image={artist?.poster} />

        <Header
          agency={artist?.agency}
          marketCap={artist?.marketCap}
          tradingVolume={artist?.tradingVolume}
          heart={artistHeart}
          onHeartChange={toggleBestArtist}
        />

        <Padding padding={18}>
          <Typography size={14} weight="bold">
            <Flex align="center">
              상품 리스트 <MdKeyboardArrowRight />
            </Flex>
          </Typography>
          <Margin size={20} />
          <HScroll>
            {_.map(products, (item) => (
              <ItemCard
                id={item.id}
                image={item.image}
                name={item.name}
                type={item.type}
                price={item.price}
                onClick={item.onClick}
                onHeartClick={item.onHeartClick}
              />
            ))}
          </HScroll>
        </Padding>

        <Padding>
          <TextField
            placeholder="아티스트를 위한 응원의 댓글을 남겨주세요!"
            icon={<AiOutlineHeart />}
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            onKeyUp={_.throttle(createComment, 1000)}
          />

          <Margin size={21} />

          <CommentList>
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

export default ArtistDetail;
