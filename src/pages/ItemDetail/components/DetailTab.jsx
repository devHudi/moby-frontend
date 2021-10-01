import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailImage = styled.img`
  width: 100%;
`;

const DetailTab = ({ images }) => (
  <Wrapper>
    {_.map(images, (image, i) => (
      <DetailImage key={`${image}${i}`} src={image} />
    ))}
  </Wrapper>
);

DetailTab.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

DetailTab.defaultProps = {
  images: [],
};

export default DetailTab;
