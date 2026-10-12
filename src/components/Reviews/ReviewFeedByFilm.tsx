import { FrownFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { allReviewsbyFilmId_GET } from '../../api/index';
import { useUserContext } from '../../hooks/useUser';
import noAvatar from '../../assets/noAvatar.svg';
import CustomLoading from '../Helper/CustomLoading';
import QueryFeedback from '../Helper/QueryFeedback';
import ReadMore from '../Helper/ReadMore';
import PaginationReview from './PaginationReview';

type Review = {
  id: number;
  attributes: {
    reviewContent: string; hasSpoiler: boolean;
    user?: { data: { id: number; attributes: { username: string; avatar?: { data: { attributes: { url: string } } | null } } } | null };
  };
};
type ReviewResponse = { data: Review[]; meta: { pagination: { total: number } } };

export default function ReviewFeedByFilm({ tokenUser, FilmId }: { tokenUser: string; FilmId: string | number }) {
  const { data: user } = useUserContext();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const query = useQuery<ReviewResponse>({
    queryKey: ['reviews', FilmId, user?.id, currentPage],
    queryFn: ({ signal }) => allReviewsbyFilmId_GET(tokenUser, `pagination[start]=${(currentPage - 1) * pageSize}&pagination[limit]=${pageSize}`, FilmId, signal),
    enabled: !!tokenUser && !!user,
    placeholderData: (previous, previousQuery) => previousQuery?.queryKey[1] === FilmId && previousQuery.queryKey[2] === user?.id ? previous : undefined,
  });
  const total = query.data?.meta.pagination.total ?? 0;
  useEffect(() => {
    if (query.isSuccess && !query.isPlaceholderData) setCurrentPage(page => Math.min(page, Math.max(1, Math.ceil(total / pageSize))));
  }, [query.isSuccess, query.isPlaceholderData, total]);

  if (query.isPending) return <div role="status" aria-label="Carregando reviews" className="flex justify-center"><CustomLoading /></div>;
  if (query.isError && !query.data) return <QueryFeedback error={query.error} onRetry={() => { void query.refetch(); }} />;
  const reviews = query.data?.data ?? [];
  return <div aria-busy={query.isFetching} className="max-w-7xl lg:max-w-5xl mx-auto animate-fadeIn">
    {query.isError && <QueryFeedback error={query.error} onRetry={() => { void query.refetch(); }} />}
    {query.isFetching && <p role="status" className="mb-4 text-center text-slate-400">Atualizando reviews...</p>}
    {reviews.length ? <div className="grid grid-cols-2 sm:grid-cols-1 gap-8">
      {reviews.map(review => {
        const author = review.attributes.user?.data?.attributes;
        return <article key={review.id} className="border-b border-blue-950 p-5 grid grid-cols-[auto,1fr] w-full">
          <img className="mr-4 w-[60px] h-[60px] rounded-full object-cover" loading="lazy" src={author?.avatar?.data?.attributes.url ?? noAvatar} alt="Avatar do autor" />
          <div><p className="text-slate-400 mb-2">por <span className="font-bold text-slate-300">{author?.username ?? 'Usuário indisponível'}</span></p>
            <p className="text-slate-200 font-serif"><ReadMore textAlert="Esta review pode conter spoilers." textUnderline=" Eu posso lidar com a verdade."
              text={review.attributes.reviewContent} hasSpoiler={review.attributes.hasSpoiler} maxLength={300} /></p>
          </div>
        </article>;
      })}
    </div> : <div className="py-16 text-center text-slate-200"><p>Até o momento, não criaram nenhuma review para este filme. <FrownFilled /></p></div>}
    <PaginationReview totalItems={total} currentPage={currentPage} onPageChange={setCurrentPage} limitItemPage={pageSize} />
  </div>;
}
