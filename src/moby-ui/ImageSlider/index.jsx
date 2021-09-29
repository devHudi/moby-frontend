import PropTypes from 'prop-types';
import styled from 'styled-components';
import Slider from 'react-slick';
import _ from 'lodash';

const settings = {
  arrows: false,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
};

const Wrapper = styled.div`
  & .slick-dots {
    bottom: 15px !important;
  }

  & .slick-dots li button:before {
    color: #ffffff;
  }
`;

const Image = styled.div`
  height: 295px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

const ImageSlider = ({ images }) => (
  <Wrapper>
    <Slider {...settings}>
      {_.map(images, (image) => (
        <Image image={image} />
      ))}
    </Slider>
  </Wrapper>
);

ImageSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

ImageSlider.defaultProps = {
  images: [],
};

export default ImageSlider;
