import { useQuery } from '@tanstack/react-query';
import { userProfile_GET } from '../../api/Auth';
import { useUserContext } from '../useUser';

export const useProfileQuery = () => {
  const { token, data, login } = useUserContext();
  return useQuery({
    queryKey: ['profile', data?.id],
    queryFn: ({ signal }) => userProfile_GET(token!, signal),
    enabled: login === true && !!token && !!data?.id,
  });
};
