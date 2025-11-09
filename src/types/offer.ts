export type Offer = {
  id: string;
  title: string;
  city: string;
  type: string;
  price: number;
  rating: number;
  isPremium: boolean;
  isFavorite: boolean;
  previewImage: string;
};

export type Offers = Offer[];
