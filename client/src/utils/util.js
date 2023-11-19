import { adminLinks, dentistLinks, userLinks } from './constants';

export const appLinks = (user) => {
  return user?.isAdmin
    ? adminLinks
    : user?.isDentist
    ? dentistLinks
    : userLinks;
};
