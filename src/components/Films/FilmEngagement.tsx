import { toast } from 'react-toastify';
import { useFilmEngagement } from '../../hooks/query/useEngagement';
import type { Id } from '../../types/engagement';
import type { EngagementAction } from '../../services/engagementService';
import LikeButton from '../User/Like/LikeButton';
import WatchButton from '../User/Watch/WatchButton';
import WatchListButton from '../User/WatchList/WatchListButton';
import RateButton from '../User/Rate/RateButton';
import Loading from '../Helper/Loading';
import QueryFeedback from '../Helper/QueryFeedback';
import { translateErrorMessage } from '../Helper/Translate';

export default function FilmEngagement({ filmId }: { filmId: Id }) {
  const { profile, pending, update } = useFilmEngagement(filmId);
  if (profile.isPending) return <div role="status" aria-label="Carregando suas interações" className="relative min-h-24"><Loading /></div>;
  if (profile.isError || !profile.data) return <QueryFeedback error={profile.error} onRetry={() => { void profile.refetch(); }} />;
  const data = profile.data;
  const contains = (films: { id: number }[] | undefined) => films?.some(film => String(film.id) === String(filmId)) ?? false;
  const like = data.like_films?.some(list => contains(list.filme)) ?? false;
  const rate = data.rating_films?.find(item => String(item.filme?.id) === String(filmId));
  const run = async (action: EngagementAction) => {
    try { await update(action); } catch (error) { toast.error(translateErrorMessage(error)); }
  };
  const className = 'relative flex w-full items-center justify-center rounded-lg border border-slate-500 border-opacity-40 text-slate-300 hover:border-opacity-100';
  return <div aria-busy={pending}>
    <ul className="mt-12 grid grid-cols-[repeat(3,1fr),2fr] gap-3 tm:grid-cols-2">
      <li className={className}><WatchButton active={contains(data.watched?.filmes)} pending={pending} onToggle={() => { void run({ type: 'watched' }); }} /></li>
      <li className={className}><LikeButton active={like} pending={pending} onToggle={() => { void run({ type: 'like' }); }} /></li>
      <li className={className}><WatchListButton active={contains(data.watchlist_films?.filmes)} pending={pending} onToggle={() => { void run({ type: 'watchlist' }); }} /></li>
      <li className={className}><RateButton value={Number(rate?.ratingValue ?? 0)} pending={pending} onChange={value => { void run({ type: 'rate', value }); }} /></li>
    </ul>
    {pending && <p role="status" className="mt-2 text-center text-sm text-slate-400">Salvando...</p>}
  </div>;
}
