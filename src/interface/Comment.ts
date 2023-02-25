//---------------------------------------Interface Comment-------------------------------------//

export interface CommentProps {
  id: string;
  title: string;
  body: string;
  url: string;
  favorites: boolean;
}

//---------------------------------------Interface card-------------------------------//

export interface CardCommentProps {
  cardComment: CommentProps;
}
