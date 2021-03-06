import { useCallback, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import {
  IonPage,
  IonContent,
  useIonToast,
  useIonViewWillEnter,
} from '@ionic/react';
import {
  Header,
  Typography,
  Margin,
  Padding,
  Divider,
  HScroll,
  ItemCard,
  Flex,
  Navigation,
  NoContent,
} from 'moby-ui';
import { MdKeyboardArrowRight } from 'react-icons/md';

import { useRecoilState } from 'recoil';
import { spinnerState } from 'states/spinner';

import * as users from 'apis/users';
import * as transactions from 'apis/transactions';
import * as favs from 'apis/favs';
import Profile from './components/Profile';

const MyPage = () => {
  const history = useHistory();
  const [present, dismiss] = useIonToast();
  const [, setSpinner] = useRecoilState(spinnerState);

  const fileRef = useRef();

  const [user, setUser] = useState(null); // null or UserDTO
  const [nftCount, setNftCount] = useState(0); // null or UserDTO
  const [favList, setFavList] = useState(null); // null or FavDTO

  const [profile, setProfile] = useState(null);

  const jwt = localStorage.getItem('jwt');

  const getCurrentUser = useCallback(async () => {
    try {
      const [userResponse, favResponse] = await Promise.all([
        users.getCurrentUser(jwt),
        favs.getAllFavProduct(jwt),
      ]);
      if (userResponse.data.success) {
        setUser(userResponse.data.user);
        setProfile(userResponse.data.user.profileImageSrc);
      } else
        throw new Error(
          '사용자 정보를 가져오는 과정에서 예상치 못한 문제가 발생했습니다.',
        );
      setFavList(favResponse.data);
    } catch (error) {
      if (error.response?.data) alert(error.response.data.message);
      else alert(error.message); // 라우터에서 이미 에러 체크해서 present 사용 X
      localStorage.removeItem('jwt');
      history.push('/login');
    }
  }, [history, jwt]);

  const getNftCount = useCallback(async () => {
    const { data } = await transactions.getMyWallet(jwt);
    setNftCount(data?.count);
  }, [jwt]);

  useIonViewWillEnter(() => {
    getCurrentUser();
    getNftCount();
  }, [getCurrentUser, getNftCount]);

  const toast = useCallback(
    (message) => {
      present({
        buttons: [{ text: '확인', handler: () => dismiss() }],
        duration: 2000,
        message,
      });
    },
    [present, dismiss],
  );

  const onLogout = () => {
    history.push('/login');
    localStorage.clear();

    present({
      buttons: [{ text: '확인', handler: () => dismiss() }],
      duration: 2000,
      message: '로그아웃 되었습니다.',
    });
  };

  const handleProfileClick = () => {
    fileRef.current.click();
  };

  const handleFileChange = useCallback(
    async (e) => {
      e.preventDefault();

      setSpinner(true);

      try {
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('profile', file);
        const { data } = await users.uploadProfile(formData, jwt);

        toast('프로필 사진이 성공적으로 변경되었습니다.');

        setProfile(data.src);
      } catch {
        toast('프로필 사진을 변경하지 못했습니다. 다시 시도해주세요.');
      }

      setSpinner(false);
    },
    [setSpinner, toast, jwt],
  );

  const handleFavProductClick = useCallback(
    (productId) => {
      history.push(`/items/${productId}`);
    },
    [history],
  );

  return (
    <IonPage>
      <IonContent>
        <Header title="My Page" />
        <Margin size={7} />

        <Profile
          name={user?.username}
          email={user?.email}
          thumbnailSrc={profile}
          favArtistName={
            user?.bestOfArtistName
              ? user?.bestOfArtistName
              : '당신의 아티스트를 Pick 해주세요!'
          }
          holding={nftCount} // 보유 NFT 수량
          balance={user?.money} // 잔액
          onClick={handleProfileClick}
        />
        <input
          type="file"
          ref={fileRef}
          accept="image/png, image/jpeg, image/jpg"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        <Padding padding={26} top={20} bottom={13}>
          <Typography size={14} weight="bold">
            내가 좋아하는 NFT
          </Typography>

          <Margin size={12} />

          {favList?.length === 0 && <NoContent height={140} />}

          <HScroll>
            {_.map(favList, (item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                image={item.thumbnailSrc}
                name={item.title}
                type={item.isOfficial ? 'official' : 'community'}
                price={item.currentPrice}
                onClick={() => handleFavProductClick(item.id)}
              />
            ))}
          </HScroll>
        </Padding>

        <Divider />

        <Padding padding={18}>
          <Padding padding={5} bottom={13}>
            <Typography size={14} weight="bold">
              기타 설정
            </Typography>
          </Padding>

          <Divider />

          <Padding padding={5}>
            {/* <Typography
              size={13}
              onClick={() => toast('해당 기능은 추후 제공될 예정입니다.')}
            >
              <Padding padding={10} left={0} right={0}>
                <Flex justify="space-between" align="center">
                  알림 설정 <MdKeyboardArrowRight />
                </Flex>
              </Padding>
            </Typography>
            <Typography
              size={13}
              onClick={() => toast('해당 기능은 추후 제공될 예정입니다.')}
            >
              <Padding padding={10} left={0} right={0}>
                <Flex justify="space-between" align="center">
                  암호 잠금 <MdKeyboardArrowRight />
                </Flex>
              </Padding>
            </Typography>
            <Typography
              size={13}
              onClick={() => toast('해당 기능은 추후 제공될 예정입니다.')}
            >
              <Padding padding={10} left={0} right={0}>
                <Flex justify="space-between" align="center">
                  캐시 삭제 <MdKeyboardArrowRight />
                </Flex>
              </Padding>
            </Typography> */}
            <Typography
              size={13}
              onClick={() => window.open('https://moby-privacy.netlify.app/')}
            >
              <Padding padding={10} left={0} right={0}>
                <Flex
                  style={{ cursor: 'pointer' }}
                  justify="space-between"
                  align="center"
                >
                  개인정보 처리방침
                  <MdKeyboardArrowRight />
                </Flex>
              </Padding>
            </Typography>
            <Typography size={13} onClick={() => toast('준비 중 입니다.')}>
              <Padding padding={10} left={0} right={0}>
                <Flex
                  style={{ cursor: 'pointer' }}
                  justify="space-between"
                  align="center"
                >
                  이용약관 <MdKeyboardArrowRight />
                </Flex>
              </Padding>
            </Typography>
            <Typography size={13} onClick={onLogout}>
              <Padding padding={10} left={0} right={0}>
                <Flex
                  style={{ cursor: 'pointer' }}
                  justify="space-between"
                  align="center"
                >
                  로그아웃 <MdKeyboardArrowRight />
                </Flex>
              </Padding>
            </Typography>
          </Padding>
          {/*
          <Divider />

          <Padding padding={5}>
            <Padding padding={10} left={0} right={0}>
              <Typography size={13}>
                <Flex justify="space-between" align="center">
                  <a
                    href="https://moby-privacy.netlify.app/"
                    rel="noopener noreferrer"
                  >
                    개인정보 처리 방침
                  </a>
                </Flex>
              </Typography>
            </Padding>
          </Padding> */}
        </Padding>

        <Navigation />
        <Margin size={90} />
      </IonContent>
    </IonPage>
  );
};

export default MyPage;
