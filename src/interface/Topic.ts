//---------------------------------------Interface Topic-------------------------------------//

export interface TopicProps {
  id: string;
  date_creation: string;
  title: string;
  body: string;
  url: string;
  favorites: boolean;
}

//---------------------------------------Interface cardTopic-------------------------------//

export interface CardTopicProps {
  cardTopic: TopicProps;
  onClickFavorite: { (topicFavorite: boolean): void };
}
