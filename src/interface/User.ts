//---------------------------------------Interface User-------------------------------------//
export interface UserTypeProps {
  role: string;
  id: string;
  nickname: string;
  email: string;
  password: string;
  phone: string;
  files: string;
  legendFiles?: string;
}
//---------------------------------------Interface PayloadToken-------------------------------//

export interface PayLoadTokenProps {
  exp: number;
  iat: number;
  id: string;
  email: string;
  role: string;
}
