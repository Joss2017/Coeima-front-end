import { UserTypeProps } from './User';

//---------------------------------------Interface Message-------------------------------//
export interface MessageProps {
  id: string;
  date_creation: string;
  body: string;
  isRead: boolean;
  sender: UserTypeProps;
  receiver: UserTypeProps;
}
//---------------------------------------Interface Message-------------------------------//

export interface CardMessageProps {
  message: MessageProps;
  listMessages: MessageProps[];
  setListMessages: (MessageProps: MessageProps[]) => void;
}
//---------------------------------------Interface Message-------------------------------//
