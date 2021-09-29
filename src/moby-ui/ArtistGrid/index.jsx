import PropTypes from 'prop-types';
import styled from 'styled-components';

const ArtistWrapper = styled.div`
  margin-bottom: 13px;
  flex-basis: 105px;
`;

const ArtistThumb = styled.div`
  margin-bottom: 7px;
  width: 105px;
  height: 105px;
  border-radius: 55px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

const ArtistText = styled.div`
  text-align: center;
  font-size: 11px;
`;

const Artist = ({ image, text }) => (
  <ArtistWrapper>
    <ArtistThumb image={image} />
    <ArtistText>{text}</ArtistText>
  </ArtistWrapper>
);

Artist.propTypes = {
  image: PropTypes.oneOf([
    PropTypes.number,
    PropTypes.shape({ uri: PropTypes.string }),
  ]),
  text: PropTypes.string,
};

Artist.defaultProps = {
  image: null,
  text: '',
};

const ArtistGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;
ArtistGrid.Artist = Artist;

export default ArtistGrid;
