import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserContext } from '../useUser';
import { useProfileQuery } from './useAuth';
import { reviewCreate, updateFilmEngagement, type EngagementAction } from '../../services/engagementService';
import type { Id } from '../../types/engagement';
import type { UserProfile } from '../../types/auth';

export const useFilmEngagement = (filmId: Id) => {
  const { token, data: user } = useUserContext();
  const profile = useProfileQuery();
  const client = useQueryClient();
  const busy = useRef(false);
  const mutation = useMutation({
    mutationFn: (action: EngagementAction) => {
      const latestProfile = client.getQueryData<UserProfile>(['profile', user?.id]);
      if (!token || !user || !latestProfile) throw new Error('Aguarde o carregamento da sua conta.');
      return updateFilmEngagement(token, user.id, filmId, latestProfile, action);
    },
    onSuccess: () => client.invalidateQueries({ queryKey: ['profile', user?.id] }),
  });
  return {
    profile,
    pending: mutation.isPending,
    update: async (action: EngagementAction) => {
      if (busy.current) return;
      busy.current = true;
      try { await mutation.mutateAsync(action); } finally { busy.current = false; }
    },
  };
};

export const useReviewCreate = (filmId: Id) => {
  const { token, data: user } = useUserContext();
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ content, hasSpoiler }: { content: string; hasSpoiler: boolean }) => {
      if (!token || !user) throw new Error('Faça login para criar uma review.');
      if (!content.trim() || content.trim().length > 1000) throw new Error('Escreva uma review com até 1000 caracteres.');
      return reviewCreate({ token, userId: user.id, filmId, content, hasSpoiler });
    },
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({ queryKey: ['reviews', filmId] }),
        client.invalidateQueries({ queryKey: ['profile', user?.id] }),
      ]);
    },
  });
};
