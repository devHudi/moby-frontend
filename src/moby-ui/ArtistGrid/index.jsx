import PropTypes from 'prop-types';
import styled from 'styled-components';

const ArtistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: 105px;
  margin-bottom: 13px;

  &:nth-last-child(1),
  &:nth-last-child(2),
  &:nth-last-child(3) {
    margin: 0;
  }
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

const Artist = ({ image, text, onClick }) => (
  <ArtistWrapper onClick={onClick}>
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
  onClick: PropTypes.func,
};

Artist.defaultProps = {
  image: null,
  text: '',
  onClick: () => console.log('Item Click'),
};

const ArtistGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
ArtistGrid.Artist = Artist;

export default ArtistGrid;
