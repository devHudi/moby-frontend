import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { IonPage, IonContent, useIonViewWillEnter } from '@ionic/react';
import { AltHeader, Divider, Padding, Margin, Navigation } from 'moby-ui';

import * as artistsApi from 'apis/artists';

import Item from './components/Item';

const Rank = () => {
  const history = useHistory();

  const [ranking, setRanking] = useState([]);

  const getRanking = useCallback(async () => {
    const jwt = localStorage.getItem('jwt');
    const { data } = await artistsApi.getArtistsWithRakings(10, 1, jwt);

    const isNews = [
      true,
      false,
      false,
      true,
      true,
      false,
      false,
      true,
      false,
      false,
    ];
    const statuses = [2, 2, 0, 2, 1, 2, 0, 0, 0, 1];

    setRanking(
      _.map(data.artists, (artist, i) => ({
        id: artist?.id,
        rank: i + 1,
        name: artist?.name,
        status: statuses[i],
        isNew: isNews[i],
        image: artist?.posterSrc,
        sales: artist?.quantity,
        likes: artist?.likesCount,
        clicks: artist?.clicked,
      })),
    );
  }, []);

  useIonViewWillEnter(() => {
    getRanking();
  });

  return (
    <IonPage>
      <IonContent>
        <AltHeader
          title="실시간 아티스트 순위"
          onBackClick={() => history.goBack()}
        />
        <Divider />

        <Padding padding={30} top={21}>
          {_.map(ranking, (artist) => (
            <Item
              key={artist.rank}
              rank={artist.rank}
              name={artist.name}
              status={artist.status}
              isNew={artist.isNew}
              image={artist.image}
              sales={artist.sales}
              likes={artist.likes}
              clicks={artist.clicks}
              defaultOpen={artist.rank < 4}
              onClick={() => history.push(`/artists/${artist.id}`)}
            />
          ))}
        </Padding>

        <Navigation />
        <Margin size={90} />
      </IonContent>
    </IonPage>
  );
};

export default Rank;
