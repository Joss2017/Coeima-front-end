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
