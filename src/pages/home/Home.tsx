import { Carousel } from 'react-bootstrap';
import './Home.css';

export const Home = () => {
  return (
    <div>
      <div className='home-wrapper'>
        <div className='container-image  '>
          <picture>
            <img
              src='assets/homeApropos.jpg'
              className='img-fluid img-thumbnail'
              alt='Accueil du site'
            />
          </picture>
        </div>

        <section>
          <h5>A propos de moi:</h5>
          <br />
          <p className='text-lowercase'>
            Passionnée par les relations humaines et la conduite du changement,
            j’accompagne depuis de nombreuses années différents profils dans
            l’appropriation et la valorisation de leur image.
            <br /> <br />
            Maman de deux enfants au sein d’une joyeuse famille recomposée,
            épicurienne et bien dans mes baskets, je pense que la vie est une
            grande aventure et qu’il faut la vivre pleinement. J’ai à cœur de
            sublimer, de façon très individualisée, la personnalité de mes
            client-e-s au travers de leur image afin qu’iels puissent se
            démarquer dès les premiers instants grâce à leur identité visuelle.
            <br /> <br />
            Pour ma part il n’y a pas de doute: Tous les corps sont beaux, il
            suffit juste de savoir comment les mettre en valeur. Au travers de
            différents ateliers décontractés, décomplexés (dans le respect de
            votre intimité et intégrité) et ludiques, je vous offre au sein de
            ma Fabrique de Conseil en Image, un espace accueillant, centré sur
            vous, sans jugement et loin des diktats de la mode afin de vous
            guider dans cette démarche. <br /> <br />{' '}
            <strong>
              Ici nous apprendrons à aimer votre image en connexion avec votre
              personnalité aux travers d’exercices qui vont vous sublimer.
            </strong>
          </p>
        </section>

        <div className='container-carrousel'>
          <Carousel>
            <Carousel.Item>
              <img
                className='d-block w-100'
                src='assets/Material.jpg'
                alt='First slide'
              />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className='d-block w-100'
                src='assets/Material-2.jpg'
                alt='Second slide'
              />

              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className='d-block w-100'
                src='assets/Material-3.jpg'
                alt='Third slide'
              />

              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>

        <section>
          <h5>Mon Parcours :</h5>
          <br />
          <p className='text-lowercase'>
            <strong>J’ai eu mille vies dans une vie!</strong>
            <br /> Coach en transition professionnelle et consultante en
            communication par la Valorisation de l’Image (certifiée AFIPP),
            j’exerce le conseil en image auprès des particuliers ainsi que des
            collectifs. J’ai animé de nombreux ateliers autour de l’image avec
            différents publics (créateurs d’entreprises, Missions locales, CE,
            personnes en reconversion professionnelle, jeunes en transition,
            femmes victimes de violences conjugales …)
            <br />
            <br /> Après avoir suivi des études commerciales, j’ai eu l’occasion
            de travailler en Angleterre, j’ai beaucoup déménagé et j’ai côtoyé
            une multitude d’univers différents qui m’ont apportés une grande
            ouverture sur le monde qui m’entoure. Par la suite, je me suis
            orientée vers l’insertion professionnelle afin d’apporter mon
            expertise du monde professionnel au service des structures avec
            lesquelles je travaillais.
            <br /> <br /> Insatiable gourmande de savoir, je me suis formée en
            parallèle à la cueillette et aux usages des plantes sauvages
            (comestibles et médicinales) ainsi qu’à l’animation d’ateliers
            autour de celles-ci (Le Chemin de la Nature), je me passionne depuis
            toujours pour les grands espaces et le monde sauvage. Je suis
            également formée à la pédagogie positive (Positiv’Act) ainsi qu’à
            l’identification et l’accompagnement des victimes de violences
            conjugales (Paroles de Femmes).
            <br /> <br /> Conseil en Image définition: Nous sommes vus avant
            d’être entendus, la première impression que l’on a d’autrui est
            déterminante! Loin des clichés télévisuels et des injonctions de la
            mode, je suis convaincue que le conseil en image s'inscrit dans une
            démarche bienveillante et inclusive où tout le monde est libre de
            s’exprimer pleinement au travers de son image. C’est un moment
            unique que l’on peut s’accorder seul-e, en famille ou en groupe
            selon les attentes. Le conseil en image reste une démarche
            individuelle même sur des ateliers collectifs.
          </p>
        </section>
      </div>
    </div>
  );
};
