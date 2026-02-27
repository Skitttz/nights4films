import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  likeCreate,
  likeRemove,
  likeUpdate,
  listCreate,
  listRemove,
  listUpdate,
  rateCreate,
  rateRemove,
  rateUpdate,
  reviewCreate,
  watchedCreate,
  watchedRemove,
  watchedUpdate,
} from '../../services/engagementService';
import {
  LikeCreateInput,
  LikeRemoveInput,
  LikeUpdateInput,
  ListCreateInput,
  ListRemoveInput,
  ListUpdateInput,
  RateCreateInput,
  RateRemoveInput,
  RateUpdateInput,
  ReviewCreateInput,
  WatchedCreateInput,
  WatchedRemoveInput,
  WatchedUpdateInput,
} from '../../types/engagement';

const useInvalidateProfile = () => {
  const qc = useQueryClient();
  return (token: string) => {
    qc.invalidateQueries({ queryKey: ['profile', token] });
  };
};

export const useLikeCreate = () => {
  const invalidate = useInvalidateProfile();
  return useMutation({
    mutationFn: (input: LikeCreateInput) => likeCreate(input),
    onSuccess: (_, variables) => invalidate(variables.token),
  });
};

export const useLikeUpdate = () => {
  const invalidate = useInvalidateProfile();
  return useMutation({
    mutationFn: (input: LikeUpdateInput) => likeUpdate(input),
    onSuccess: (_, variables) => invalidate(variables.token),
  });
};

export const useLikeRemove = () => {
  const invalidate = useInvalidateProfile();
  return useMutation({
    mutationFn: (input: LikeRemoveInput) => likeRemove(input),
    onSuccess: (_, variables) => invalidate(variables.token),
  });
};

export const useListCreate = () => {
  const invalidate = useInvalidateProfile();
  return useMutation({
    mutationFn: (input: ListCreateInput) => listCreate(input),
    onSuccess: (_, variables) => invalidate(variables.token),
  });
};

export const useListUpdate = () => {
  const invalidate = useInvalidateProfile();
  return useMutation({
    mutationFn: (input: ListUpdateInput) => listUpdate(input),
    onSuccess: (_, variables) => invalidate(variables.token),
  });
};

export const useListRemove = () => {
  const invalidate = useInvalidateProfile();
  return useMutation({
    mutationFn: (input: ListRemoveInput) => listRemove(input),
    onSuccess: (_, variables) => invalidate(variables.token),
  });
};

export const useWatchedCreate = () => {
  const invalidate = useInvalidateProfile();
  return useMutation({
    mutationFn: (input: WatchedCreateInput) => watchedCreate(input),
    onSuccess: (_, variables) => invalidate(variables.token),
  });
};

export const useWatchedUpdate = () => {
  const invalidate = useInvalidateProfile();
  return useMutation({
    mutationFn: (input: WatchedUpdateInput) => watchedUpdate(input),
    onSuccess: (_, variables) => invalidate(variables.token),
  });
};

export const useWatchedRemove = () => {
  const invalidate = useInvalidateProfile();
  return useMutation({
    mutationFn: (input: WatchedRemoveInput) => watchedRemove(input),
    onSuccess: (_, variables) => invalidate(variables.token),
  });
};

export const useRateCreate = () => {
  const invalidate = useInvalidateProfile();
  return useMutation({
    mutationFn: (input: RateCreateInput) => rateCreate(input),
    onSuccess: (_, variables) => invalidate(variables.token),
  });
};

export const useRateUpdate = () => {
  const invalidate = useInvalidateProfile();
  return useMutation({
    mutationFn: (input: RateUpdateInput) => rateUpdate(input),
    onSuccess: (_, variables) => invalidate(variables.token),
  });
};

export const useRateRemove = () => {
  const invalidate = useInvalidateProfile();
  return useMutation({
    mutationFn: (input: RateRemoveInput) => rateRemove(input),
    onSuccess: (_, variables) => invalidate(variables.token),
  });
};

export const useReviewCreate = () => {
  const invalidate = useInvalidateProfile();
  return useMutation({
    mutationFn: (input: ReviewCreateInput) => reviewCreate(input),
    onSuccess: (_, variables) => invalidate(variables.token),
  });
};
