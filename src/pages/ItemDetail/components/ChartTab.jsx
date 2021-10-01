import { Margin } from 'moby-ui';
import Chart from './Chart';
import Table from './Table';

const dummyData = [
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

const ChartTab = () => (
  <div>
    <Chart />

    <Margin size={7} />

    <Table data={dummyData} />
  </div>
);

export default ChartTab;
