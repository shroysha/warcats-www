import { BuildingPath, UnitPath } from 'warcats-common';

export const getImagePath = (path: UnitPath | BuildingPath) => {
  return '/pngs/' + path + '.png';
};
