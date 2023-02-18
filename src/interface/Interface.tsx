//---------------------------------------Interface Offer-------------------------------------//
export interface OfferProps {
  id: string;
  picture: string;
  title: string;
  body: string;
  price: string;
}

//---------------------------------------Interface cardOffer-------------------------------//

export interface CardOfferProps {
  cardOffer: OfferProps;
}

//---------------------------------------Interface Topic-------------------------------------//

export interface TopicProps {
  id: string;
  title: string;
  body: string;
  url: string;
  favorites: boolean;
}

//---------------------------------------Interface cardTopic-------------------------------//

export interface CardTopicProps {
  cardTopic: TopicProps;
  onClickFavorite:{(topicFavorite:boolean):void}
}

//---------------------------------------Interface PayloadToken-------------------------------//

//---------------------------------------Interface User-------------------------------------//
export interface UserTypeProps {
  role: string;
  nickname: string;
  email: string;
  password: string;
  phone: string;
  files: string;
  legendFiles?: string;
}

export interface PayLoadTokenProps {
  exp: number;
  iat: number;
  id: string;
  email: string;
  role: string;
}
