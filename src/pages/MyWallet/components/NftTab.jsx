import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';

import { Padding, Divider, NoContent } from 'moby-ui';

import Item from './Item';

const NftTab = ({ items }) => {
  const history = useHistory();

  return (
    <>
      {items.length === 0 && <NoContent height={400} />}

      {_.map(items, (item, i) => (
        <>
          <Item
            image={item.image}
            name={item.name}
            date={item.date}
            buyPrice={item.buyPrice}
            currentPrice={item.currentPrice}
            holding={item.holding}
            holdingPercentage={item.holdingPercentage}
            onClick={() => history.push(`/items/${item.id}`)}
          />
          {i < items.length - 1 && (
            <Padding padding={21} left={0} right={0}>
              <Divider />
            </Padding>
          )}
        </>
      ))}
    </>
  );
};

NftTab.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      date: PropTypes.instanceOf(Date),
      buyPrice: PropTypes.number,
      currentPrice: PropTypes.number,
      holding: PropTypes.number,
      holdingPercentage: PropTypes.number,
      onClick: PropTypes.func,
    }),
  ),
};

NftTab.defaultProps = {
  items: [],
};

export default NftTab;
