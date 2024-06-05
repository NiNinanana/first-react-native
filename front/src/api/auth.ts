import {api} from '.';
import {Category, Profile} from '../types/domain';
import {getEncryptStorage} from '../utils';

interface RequestUser {
  email: string;
  password: string;
}

const postSignup = async ({email, password}: RequestUser): Promise<void> => {
  const {data} = await api.post('/auth/signup', {
    email,
    password,
  });

  return data;
};

interface ResponseToken {
  accessToken: string;
  refreshToken: string;
}

const postLogin = async ({
  email,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const {data} = await api.post('/auth/signin', {email, password});

  return data;
};

type ResponseProfile = Profile & Category;

const getProfile = async (): Promise<ResponseProfile> => {
  const {data} = await api.get('/auth/me');

  return data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');

  const {data} = await api.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

const postLogout = async () => {
  await api.post('/auth/logout');
};

export {postSignup, postLogout, postLogin, getAccessToken, getProfile};
export type {ResponseToken, RequestUser, ResponseProfile};
