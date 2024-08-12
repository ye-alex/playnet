import React, { FC, Fragment, useMemo } from 'react';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import ImageBa from '../../assets/services-image-ba.png';
import ImageGd from '../../assets/services-image-gd.png';
import ImageGm from '../../assets/services-image-gm.png';
import ImageGr from '../../assets/services-image-gr.png';
import ImageMd from '../../assets/services-image-md.png';
import { NavigationTemplate } from '../../components/NavigationTemplate';
import { Section } from '../../components/Section';
import { GetInTouchButton } from '../../components/shared/GetInTouchButton';
import { ImageText } from '../../components/shared/ImageText';
import { useDeviceInfo } from '../../hooks/useDeviceInfo';
import './Services.scss';

export const Services: FC = () => {
  const { isMobileDevice } = useDeviceInfo();
  const gallerySlides = useMemo(
    () => [
      <ImageText
        title="Game"
        imgSrc={ImageGd}
        coloredTitle="Development"
        description="Develop engaging games that captivate users and drive engagement. Our expertise in creating fun, accessible games ensures broad appeal, lasting player retention, and increased revenue. We make gaming a delightful experience that keeps players coming back for more."
      />,
      <ImageText
        isReverse
        title="BRAND"
        imgSrc={ImageBa}
        coloredTitle="Advergaming"
        description="Games designed not only to entertain but also to enhance brand awareness and engagement. If you have a non-gaming product, we can create a game that boosts your product or brand, making it more appealing to your target audience. Turn your brand into a captivating gaming experience."
      />,
      <ImageText
        title="Gamification"
        imgSrc={ImageGm}
        coloredTitle="MECHANICS"
        description="Implement gamification strategies that enhance user interaction and loyalty. By integrating game mechanics into non-game contexts, we transform user experiences and drive engagement across various platforms. Gamification can revolutionise the way your customers interact with your brand."
      />,
      <ImageText
        isReverse
        title="Metaverse"
        imgSrc={ImageMd}
        coloredTitle="Development"
        description="Create immersive metaverse experiences that push the boundaries of virtual interaction. Our innovative approach to building virtual worlds provides users with unique and engaging digital environments. Step into the future with our cutting-edge metaverse solutions."
      />,
      <ImageText
        title="GamING"
        imgSrc={ImageGr}
        coloredTitle="RELATED"
        description="Looking for a specific gaming-related effort such as art creation, animation, or custom development? Reach out to us, and we will prepare a custom solution that fits your current and future needs. Our versatile team is equipped to handle a wide array of specialised gaming projects."
      />,
    ],
    [isMobileDevice]
  );

  return (
    <NavigationTemplate title="SERVICES" description="WHAT'S ON THE TABLE" className="services">
      <Section className="services__content">
        <p>
          Looking to create an amazing game in a quick manner? From captivating casual games to groundbreaking metaverse
          projects, our extensive range of services covers all your gaming development needs. Explore how our innovative
          solutions can bring your ideas to life with creativity, precision, and technical excellence.
        </p>
        <GetInTouchButton className="services__contact-link" />
      </Section>
      {isMobileDevice ? (
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          {gallerySlides.map((slide, key) => (
            <SwiperSlide key={key}>{slide}</SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Section className="services__gallery">
          {gallerySlides.map((item, key) => (
            <Fragment key={key}>{item}</Fragment>
          ))}
        </Section>
      )}
    </NavigationTemplate>
  );
};
