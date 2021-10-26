import dayjs from 'dayjs';
import styled from 'styled-components';

import { Line } from 'react-chartjs-2';

import PeriodTab from './PeriodTab';

const DUMMY_LABEL = Array.from(Array(10)).map(() =>
  dayjs(new Date()).format('YY.MM.DD'),
);
const DUMMY_DATA = Array.from(Array(10)).map(() => Math.random() * 1000);

const data = {
  labels: DUMMY_LABEL,
  datasets: [
    {
      data: DUMMY_DATA,
      fill: true,
      backgroundColor: 'rgba(60, 34, 152, .15)',
      borderColor: '#3C2298',
    },
  ],
};

const options = {
  plugins: {
    legend: { display: false },
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: false,
        },
      },
    ],
  },
};

const TitleText = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const ChartWrapper = styled.div`
  padding: 15px;
  border: 1px solid #e8e8e8;
`;

const Chart = () => (
  <div>
    <TitleText>최근 거래 (₩)</TitleText>

    <PeriodTab />

    <ChartWrapper>
      <Line data={data} options={options} />
    </ChartWrapper>
  </div>
);

export default Chart;
