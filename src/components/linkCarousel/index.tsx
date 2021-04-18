import React from 'react';
import { Carousel } from 'antd';
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
<<<<<<< HEAD
        <CarouselSlide>
          <LinkCard
            text="My Blocks"
            path={Routes.NOT_FOUND}
            background="img1"
          />
        </CarouselSlide>
        <CarouselSlide>
          <LinkCard
            text="View Teams"
            path={Routes.AVAILABLE_TEAMS}
            background="img2"
          />
        </CarouselSlide>
        <CarouselSlide>
          <LinkCard
            text="Volunteer Leaderboard"
            path={Routes.VOLUNTEER}
            background="img3"
          />
        </CarouselSlide>
        <CarouselSlide>
          <LinkCard
            text="Team Leaderboard"
            path={Routes.TEAM_LEADERBOARD}
            background="img4"
          />
        </CarouselSlide>
        <CarouselSlide>
          <LinkCard text="5th Card" path={Routes.TREE} background="img1" />
        </CarouselSlide>
        <CarouselSlide>
          <LinkCard text="6th Card" path={Routes.NOT_FOUND} background="img2" />
        </CarouselSlide>
=======
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
>>>>>>> master
      </StyledCarousel>
    </>
  );
};

export default LinkCarousel;
