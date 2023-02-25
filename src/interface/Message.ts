import { UserTypeProps } from "./User";

//---------------------------------------Interface Message-------------------------------//
export interface MessageProps {
  id: string;
  date_creation: string;
  body: string;
  url: string;
  isRead: boolean;
  sender: UserTypeProps;
  receiver: UserTypeProps;
}
//---------------------------------------Interface Message-------------------------------//

export interface CardMessageProps {
  message: MessageProps;
}
//---------------------------------------Interface Message-------------------------------//

export interface CardCreateMessageProps {
  createMessage: MessageProps;
}
