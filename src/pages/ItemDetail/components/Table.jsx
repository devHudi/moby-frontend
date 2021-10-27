import PropTypes from 'prop-types';
import _ from 'lodash';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { Divider, Margin, NoContent } from 'moby-ui';

const RowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  font-weight: ${(props) => (props.header ? 'bold' : 'normal')};
`;

const Column = styled.div`
  padding: 0 10px;
  text-align: center;
  flex-basis: 33.333%;
  text-align: ${(props) => props.align || 'center'};
`;

const Row = ({ header, date, quantity, price }) => (
  <RowWrapper header={header}>
    <Column align="left">
      {typeof date === 'string' ? date : dayjs(date).format('YYYY.MM.DD')}
    </Column>
    <Column>{quantity}</Column>
    <Column align="right">
      {price.toLocaleString()} {typeof price === 'number' && '원'}
    </Column>
  </RowWrapper>
);

Row.propTypes = {
  header: PropTypes.bool,
  date: PropTypes.oneOf([PropTypes.instanceOf(Date), PropTypes.string]),
  quantity: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
  price: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
};

Row.defaultProps = {
  header: false,
  date: new Date(),
  quantity: null,
  price: null,
};

const TableWrapper = styled.div``;

const Table = ({ data }) => {
  if (data.length === 0) return null;

  return (
    <>
      <Margin size={10} />
      <TableWrapper>
        <Row header date="거래일" quantity="수량" price="거래가" />

        <Margin size={8} />
        <Divider />
        <Margin size={7} />
        {_.map(data, (row) => (
          <>
            <Row row={row.date} quantity={row.quantity} price={row.price} />
            <Margin size={3} />
          </>
        ))}

        <Margin size={5} />
        <Divider />
      </TableWrapper>
    </>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date),
      quantity: PropTypes.number,
      price: PropTypes.price,
    }),
  ),
};

Table.defaultProps = {
  data: [],
};

export default Table;
