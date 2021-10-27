import _ from 'lodash';
import dayjs from 'dayjs';
import styled from 'styled-components';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import PeriodTab from './PeriodTab';

const TitleText = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const ChartWrapper = styled.div`
  margin: 20px 0 10px 0;
  height: 200px;
`;

const Chart = ({ data }) => {
  const chartData = _.map(data, (transaction) => ({
    name: new Date(transaction.date),
    price: transaction.price,
  }));

  return (
    <div>
      <TitleText>최근 거래 (₩)</TitleText>

      <PeriodTab />

      <ChartWrapper>
        <ResponsiveContainer height="100%">
          <AreaChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="1" />

            <XAxis hide dataKey="name" />
            <YAxis padding={{ left: 0 }} tick={{ fontSize: 10 }} />
            <Tooltip
              label="name"
              labelFormatter={(t) => new Date(t).toLocaleString()}
            />

            <Area
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </div>
  );
};

export default Chart;
