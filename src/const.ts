export const allCities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const enum APIRoute {
  Login = 'login',
  Offers = 'offers',
  Comments = 'comments',
}

export enum NameSpace {
  Other = 'OTHER',
  Offers = 'OFFERS',
  Reviews = 'REVIEWS',
  User = 'USER',
}
