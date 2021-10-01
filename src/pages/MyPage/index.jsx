import _ from 'lodash';
import { IonPage, IonContent } from '@ionic/react';
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
} from 'moby-ui';

import { MdKeyboardArrowRight } from 'react-icons/md';

import Profile from './components/Profile';

const dummyItems = [
  {
    image: 'https://picsum.photos/300/300',
    name: 'test',
    type: 'official',
    price: 30000,
    onHeartClick: () => {},
  },
  {
    image: 'https://picsum.photos/300/300',
    name: 'test',
    type: 'community',
    price: 30000,
    onHeartClick: () => {},
  },
  {
    image: 'https://picsum.photos/300/300',
    name: 'test',
    type: 'official',
    price: 30000,
    onHeartClick: () => {},
  },
];

const MyPage = () => (
  <IonPage>
    <IonContent>
      <Header title="My Page" />
      <Margin size={7} />

      <Profile
        name="슈가님사랑해용"
        email="sample@email.com"
        holding={52}
        balance={520800}
      />

      <Padding padding={26} top={20} bottom={13}>
        <Typography size={14} weight="bold">
          내가 좋아하는 NFT
        </Typography>

        <Margin size={12} />

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

      <Divider />

      <Padding padding={18}>
        <Padding padding={5} bottom={13}>
          <Typography size={14} weight="bold">
            앱 설정
          </Typography>
        </Padding>

        <Divider />

        <Padding padding={5}>
          <Typography size={13}>
            <Padding padding={10} left={0} right={0}>
              <Flex justify="space-between" align="center">
                알림 설정 <MdKeyboardArrowRight />
              </Flex>
            </Padding>
          </Typography>
          <Typography size={13}>
            <Padding padding={10} left={0} right={0}>
              <Flex justify="space-between" align="center">
                암호 잠금 <MdKeyboardArrowRight />
              </Flex>
            </Padding>
          </Typography>
          <Typography size={13}>
            <Padding padding={10} left={0} right={0}>
              <Flex justify="space-between" align="center">
                캐시 삭제 <MdKeyboardArrowRight />
              </Flex>
            </Padding>
          </Typography>
          <Typography size={13}>
            <Padding padding={10} left={0} right={0}>
              <Flex justify="space-between" align="center">
                로그 아웃 <MdKeyboardArrowRight />
              </Flex>
            </Padding>
          </Typography>
        </Padding>

        <Divider />

        <Padding padding={5}>
          <Padding padding={10} left={0} right={0}>
            <Typography size={13}>
              <Flex justify="space-between" align="center">
                개인정보 처리 방침
              </Flex>
            </Typography>
          </Padding>
        </Padding>
      </Padding>

      <Navigation />
      <Margin size={90} />
    </IonContent>
  </IonPage>
);

export default MyPage;
