import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import styled from 'styled-components';

import { Margin, Padding, ItemCard, Typography } from 'moby-ui';
import Chart from './Chart';
import Table from './Table';

const Grid = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0;
`;

const GridItem = styled.div`
  margin-bottom: 11px;

  &:last-child {
    margin-bottom: 0;
  }

  &:nth-child(odd) > div {
    margin: 0;
  }

  &:nth-child(even) > div {
    margin-left: auto;
  }
`;

const ChartTab = ({ items }) => {
  const dummyTableData = [
    { date: new Date(), quantity: 1, price: 10000 },
    { date: new Date(), quantity: 1, price: 10000 },
    { date: new Date(), quantity: 1, price: 10000 },
    { date: new Date(), quantity: 1, price: 10000 },
    { date: new Date(), quantity: 1, price: 10000 },
    { date: new Date(), quantity: 1, price: 10000 },
    { date: new Date(), quantity: 1, price: 10000 },
    { date: new Date(), quantity: 1, price: 10000 },
    { date: new Date(), quantity: 1, price: 10000 },
  ];

  return (
    <div>
      <Chart />

      <Margin size={7} />

      <Table data={dummyTableData} />

      <Margin size={20} />

      <Padding padding={14} top={0}>
        <Typography size={14} weight="bold">
          추천 NFT
        </Typography>

        <Margin size={9} />

        <Grid>
          {_.map(items, (item) => (
            <GridItem>
              <ItemCard
                id={item.id}
                image={item.image}
                name={item.name}
                type={item.type}
                price={item.price}
                onClick={item.onClick}
              />
            </GridItem>
          ))}
        </Grid>
      </Padding>
    </div>
  );
};

export default ChartTab;
