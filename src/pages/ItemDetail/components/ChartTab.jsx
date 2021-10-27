import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';

import { Margin, Padding, ItemCard, Typography, NoContent } from 'moby-ui';

import * as transactionsApi from 'apis/transactions';

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

const ChartTab = ({ itemId, items }) => {
  const jwt = localStorage.getItem('jwt');

  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const getTransactionData = useCallback(async () => {
    const { data } = await transactionsApi.getChart(itemId, jwt);

    setTableData(
      _.map(data, (row) => ({
        date: new Date(row.date),
        quantity: row.count,
        price: row.price,
      })),
    );

    setChartData(
      _.map(data, (transaction) => ({
        date: transaction.date,
        price: transaction.price,
      })),
    );
  }, [itemId, jwt]);

  useEffect(() => {
    getTransactionData();
  }, [getTransactionData]);

  return (
    <div>
      <Chart data={chartData} />

      <Margin size={7} />

      <Table data={tableData} />

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
  itemId: PropTypes.string.isRequired,
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
