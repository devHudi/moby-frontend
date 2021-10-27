import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';

import { Margin, Padding, ItemCard, Typography, NoContent } from 'moby-ui';
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

  console.log({ items });

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

        {items.length === 0 && <NoContent height={150} />}
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

ChartTab.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      image: PropTypes.image,
      name: PropTypes.string,
      price: PropTypes.number,
      type: PropTypes.string,
      onClick: PropTypes.func,
    }),
  ),
};

ChartTab.defaultProps = {
  items: [],
};

export default ChartTab;
