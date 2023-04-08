export enum Websites {
  SFTT = 'SFTT',
  CAMBRIDGE = 'CAMBRIDGE',
}

export const site = (process.env.REACT_APP_TENANT as Websites) || Websites.SFTT;
