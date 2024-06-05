import {useMutation, useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {queryClient} from '.';
import {
  getAccessToken,
  getProfile,
  postLogin,
  postLogout,
  postSignup,
} from '@/api/auth';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/types/common';
import {removeEncryptStorage, setEncryptStorage} from '@/utils';
import {removeHeader, setHeader} from '@/utils/header';
import {numbers, queryKeys, storageKeys} from '@/constants';

const usePostSignup = (mutationOptions?: UseMutationCustomOptions) =>
  useMutation({mutationFn: postSignup, ...mutationOptions});

const usePostLogin = (mutationOptions?: UseMutationCustomOptions) =>
  useMutation({
    mutationFn: postLogin,
    onSuccess: ({accessToken, refreshToken}) => {
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },
    ...mutationOptions,
  });

const usePostLogout = (mutationOptions?: UseMutationCustomOptions) =>
  useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});
    },
    ...mutationOptions,
  });

const useGetRefreshToken = () => {
  const {isSuccess, isError, data} = useQuery({
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    }
  }, [isError]);

  return {isSuccess, isError};
};

const useGetProfile = (queryOptions?: UseQueryCustomOptions) => {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    queryFn: getProfile,
    ...queryOptions,
  });
};

const useAuth = () => {
  const signupMutation = usePostSignup();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const isLogin = refreshTokenQuery.isSuccess && getProfileQuery.isSuccess;
  const loginMutation = usePostLogin();
  const logoutMutation = usePostLogout();

  return {
    signupMutation,
    loginMutation,
    isLogin,
    getProfileQuery,
    logoutMutation,
  };
};

export default useAuth;
