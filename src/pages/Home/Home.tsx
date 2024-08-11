import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import ClickPlay from '../../assets/click-play.png';
import BrandGame from '../../assets/SVG/services-ba.svg';
import GameDev from '../../assets/SVG/services-gd.svg';
import Gamemification from '../../assets/SVG/services-gm.svg';
import Gaming from '../../assets/SVG/services-gr.svg';
import Metaverse from '../../assets/SVG/services-md.svg';
import BgImg from '../../assets/we-are-bg.png';
import { NavigationTemplate } from '../../components/NavigationTemplate';
import { Section } from '../../components/Section';
import { IconText } from '../../components/shared/IconText';
import { ROUTES } from '../../costants/routes';
import './Home.scss';

export const Home: FC = () => {
  return (
    <NavigationTemplate className="home">
      <img src={BgImg} alt="bg" className="home__img" />
      <Section>
        <div className="home__content">
          <div>
            <h2>Who We Are</h2>
            <h5>
              At <strong>Playnet Interactive</strong>, we blend several years of experience in branding and commercial
              product development with the cutting-edge skills of seasoned gaming professionals. This unique synergy
              enables us to craft immersive gaming experiences that are not only engaging but also strategically aligned
              with your business objectives. Discover how we can turn your vision into reality.
            </h5>
          </div>
          <div className="home__services">
            <IconText imgAlt="game-dev" imgSrc={GameDev} title="Game" description="Development" />
            <IconText imgAlt="brand-game" imgSrc={BrandGame} title="Brand" description="Advergaming" />
            <IconText imgAlt="gamemification" imgSrc={Gamemification} title="Gamemification" description="Mechanics" />
            <IconText imgAlt="metaverse" imgSrc={Metaverse} title="Metaverse" description="Development" />
            <IconText imgAlt="gaming" imgSrc={Gaming} title="Gaming" description="Related" />
          </div>
        </div>
      </Section>
      <Section bgUrl={ClickPlay} className="home__play">
        <Link className="home__link" to={ROUTES.CONTACT}>
          Get in touch
        </Link>
        <div className="home__content">
          <h2>Click & Play</h2>
          <h5>
            Thanks to our iterative development process, we provide full visibility across all development stages,
            ensuring perfect alignment with your overall business vision. Partner with us for a seamless, transparent,
            and collaborative experience.
          </h5>
        </div>
      </Section>
    </NavigationTemplate>
  );
};
