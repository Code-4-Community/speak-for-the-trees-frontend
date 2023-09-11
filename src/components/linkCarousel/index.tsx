import React from 'react';
import Carousel from 'antd/es/carousel';
import styled from 'styled-components';
import { LIGHT_GREEN } from '../../utils/colors';
import LinkCard, { LinkCardProps } from '../linkCard';

const StyledCarousel = styled(Carousel)`
  max-width: 1350px;
  margin: auto;
  border: solid;
  border-radius: 10px;
  border-width: 5px 5px 5px 5px;
  border-color: ${LIGHT_GREEN};
`;

const CarouselSlide = styled.div`
  padding: 10px;
  border: solid;
  border-width: 0px 0px 50px 0px;
  border-color: ${LIGHT_GREEN};
  text-align: center;
`;

interface CarouselProps {
  data: LinkCardProps[];
  slidesPerPage: number;
}

const LinkCarousel: React.FC<CarouselProps> = ({ data, slidesPerPage }) => {
  return (
    <>
      <StyledCarousel
        {...{
          slidesToShow: slidesPerPage,
          slidesToScroll: slidesPerPage,
          autoplay: true,
        }}
      >
        {data.map((item) => {
          return (
            <CarouselSlide key={item.text}>
              <LinkCard
                text={item.text}
                path={item.path}
                background={item.background}
              />
            </CarouselSlide>
          );
        })}
      </StyledCarousel>
    </>
  );
};

export default LinkCarousel;
