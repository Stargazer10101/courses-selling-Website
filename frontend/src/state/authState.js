import { atom, selector } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    username: null,
    role: null,
    isLoading: true,
  },
});

export const isUserLoggedIn = selector({
  key: 'isUserLoggedIn',
  get: ({ get }) => {
    const user = get(userState);
    return user.username !== null && user.role === 'user';
  },
});

export const isAdminLoggedIn = selector({
  key: 'isAdminLoggedIn',
  get: ({ get }) => {
    const user = get(userState);
    return user.username !== null && user.role === 'admin';
  },
}); 