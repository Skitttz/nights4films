import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FilmsIdFromWatchListId_GET,
  showAvatar_GET,
  uploadAvatar_POST,
  userListFilms_GET,
  userProfile_GET,
} from '../api/index';
import noAvatar from '../assets/noAvatar.svg';
import Button from '../components/Forms/Button';
import CapitalizeLetter from '../components/Helper/CapitalizeLetter';
import Loading from '../components/Helper/Loading';
import Head from '../components/Helper/Head';
import { useUserContext } from '../hooks/useUser';

const UserProfile = () => {
  const { data, token } = useUserContext();
  const [files, setFiles] = useState<FileList | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);
  const selectedFile = files?.[0] ?? null;

  const { data: profileRes, isLoading: loadingProfile } = useQuery({
    queryKey: ['profile', token],
    queryFn: async () => userProfile_GET(token as string),
    enabled: !!token,
  });

  const { data: watchListId } = useQuery({
    queryKey: ['watchId', token],
    queryFn: async () => userListFilms_GET(token as string),
    enabled: !!token,
  });

  const { data: listRes, isLoading: loadingList } = useQuery({
    queryKey: ['watchFilms', watchListId, token],
    queryFn: async () =>
      FilmsIdFromWatchListId_GET(watchListId as string, token as string),
    enabled: !!token && !!watchListId,
  });

  const {
    data: avatarUrl,
    isLoading: loadingAvatar,
    refetch: refetchAvatar,
  } = useQuery({
    queryKey: ['avatar', token],
    queryFn: async () => {
      const resp = await showAvatar_GET(token as string);
      return resp?.avatar?.url ? `${resp.avatar.url}?t=${Date.now()}` : null;
    },
    enabled: !!token,
  });

  const stats = {
    numFilme: profileRes?.watchlist_films?.filmes?.length ?? 0,
    numLiked: profileRes?.like_films?.length ?? 0,
    numRated: profileRes?.rating_films?.length ?? 0,
  };

  function formatDateHour(dataHora: string) {
    const dataDate = new Date(dataHora);
    const dia = dataDate.getDate().toString().padStart(2, '0');
    const mes = (dataDate.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataDate.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  const uploadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !token || !data?.id) return;
    const formData = new FormData();
    formData.append('ref', 'plugin::users-permissions.user');
    formData.append('refId', data.id);
    formData.append('field', 'avatar');
    formData.append('files', selectedFile);
    formData.append('source', 'users-permissions');
    try {
      setIsUploadingAvatar(true);
      const response: any = await uploadAvatar_POST(formData, token);
      const newUrl = response?.[0]?.url
        ? `${response[0].url}?t=${Date.now()}`
        : null;
      if (newUrl) {
        await refetchAvatar();
      }
      setFiles(null);
      setFileInputKey((k) => k + 1);
      toast.success('Avatar alterado com sucesso!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    } catch (error) {
      toast.error('Ops! Não conseguimos atualizar seu avatar.');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  if (!token || !data || loadingProfile) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Head title={' » Meu Perfil'} description="Pagina do Perfil" />
        <div className="mx-auto w-full max-w-7xl lg:max-w-5xl px-4 tm:px-3 cardMD:px-4 pt-16 pb-20 animate-animeDown">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 tm:p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-slate-200 text-lg font-semibold">Meu perfil</p>
            </div>
            <div className="mt-8 flex justify-center">
              <Loading />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const username = CapitalizeLetter(data.username);

  return (
    <div className="min-h-screen bg-slate-950">
      <Head title={' » Meu Perfil'} description="Pagina do Perfil" />
      <div className="mx-auto w-full max-w-7xl lg:max-w-5xl px-4 tm:px-3 cardMD:px-4 pt-14 pb-20 animate-animeDown text-slate-200 font-roboto">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 tm:p-4">
          <div className="flex items-start justify-between gap-4 tm:flex-col tm:items-stretch">
            <div className="min-w-0">
              <h1 className="text-3xl tm:text-2xl font-semibold tracking-tight text-slate-100">
                Olá, <span className="text-violet-400">{username}</span>
              </h1>
              <p className="mt-2 text-sm text-slate-400">{data.email}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                <span className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1">
                  Conta criada: {formatDateHour(data.createdAt)}
                </span>
                <span className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1">
                  Atualizado: {formatDateHour(data.updatedAt)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 tm:grid-cols-3">
              {[
                { label: 'Curtidos', value: stats.numLiked, accent: 'text-rose-200' },
                { label: 'Na lista', value: stats.numFilme, accent: 'text-emerald-200' },
                { label: 'Avaliados', value: stats.numRated, accent: 'text-indigo-200' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 tm:px-3"
                >
                  <p className={`text-2xl tm:text-xl font-bold ${s.accent}`}>
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-12 gap-6 items-start">
          <div className="col-span-4 tm:col-span-12 cardMD:col-span-12 rounded-2xl border border-slate-800 bg-slate-900/30 p-6 tm:p-4">
            <form onSubmit={uploadImage}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-slate-100">Avatar</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Atualize sua foto.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center">
                {loadingAvatar ? (
                  <div className="w-[168px] h-[168px] rounded-full border border-slate-800 bg-slate-900/40 flex items-center justify-center">
                    <Loading />
                  </div>
                ) : (
                  <img
                    className="w-[168px] h-[168px] rounded-full border-2 border-slate-800 object-cover"
                    src={avatarUrl || noAvatar}
                    alt={`Avatar de ${username}`}
                  />
                )}
              </div>

              <div className="mt-5">
                <input
                  key={fileInputKey}
                  id="avatar-file"
                  aria-label="Selecione sua foto de perfil"
                  className="sr-only"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFiles(e.target.files)}
                />

                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-100">
                        {selectedFile ? 'Arquivo selecionado' : 'Selecionar arquivo'}
                      </p>
                      <p className="mt-1 text-xs text-slate-400 truncate">
                        {selectedFile ? selectedFile.name : 'PNG ou JPG'}
                      </p>
                    </div>

                    <label
                      htmlFor="avatar-file"
                      className={`inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/50 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800/60 transition-colors whitespace-nowrap ${isUploadingAvatar ? 'pointer-events-none opacity-60' : ''}`}
                    >
                      {selectedFile ? 'Trocar' : 'Escolher'}
                    </label>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <Button
                      type="submit"
                      disabled={!selectedFile || isUploadingAvatar}
                      customStyle="flex-1 p-2 border-violet-800 bg-violet-800 hover:bg-violet-700 transition-colors font-bold rounded-lg"
                    >
                      {isUploadingAvatar ? 'Salvando...' : 'Salvar avatar'}
                    </Button>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-lg border border-slate-800 bg-slate-900/50 text-sm font-semibold text-slate-200 hover:bg-slate-800/60 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={!selectedFile || isUploadingAvatar}
                      onClick={() => {
                        setFiles(null);
                        setFileInputKey((k) => k + 1);
                      }}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="col-span-8 tm:col-span-12 cardMD:col-span-12 rounded-2xl border border-slate-800 bg-slate-900/30 p-6 tm:p-4">
            <div className="flex items-center justify-between gap-3 tm:flex-col tm:items-stretch">
              <div>
                <p className="text-lg font-semibold text-slate-100">Minha lista</p>
                <p className="mt-1 text-sm text-slate-400">
                  Filmes que você adicionou para ver depois.
                </p>
              </div>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/50 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800/60 transition-colors"
              >
                Voltar ao catálogo
              </Link>
            </div>

            <div className="mt-6 tm:mt-8 tm:w-full">
              {loadingList ? (
                <div className="py-10 flex justify-center">
                  <Loading />
                </div>
              ) : (listRes || []).length !== 0 ? (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(176px,auto))] gap-4 justify-center tm:overflow-x-auto tm:flex tm:shrink-0 tm:pb-6">
                  {(listRes || []).map((film: any) => (
                    <Link
                      key={film.id}
                      to={`/filmes/${film.attributes.slug}`}
                      className="tm:w-full group w-[176px] rounded-xl border border-slate-800 bg-slate-900/40 p-3 hover:bg-slate-900/60 transition-colors"
                    >
                      <img
                        className="w-[160px] h-[240px] object-cover rounded-lg mx-auto transition-transform duration-200 group-hover:scale-[1.02] tm:w-full tm:min-w-[160px]"
                        src={film.attributes.card.data.attributes.url}
                        alt={film.attributes.title}
                      />
                      <p className="mt-3 text-sm font-semibold text-slate-200 group-hover:text-white transition-colors truncate">
                        {film.attributes.title}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 text-center">
                  <p className="text-slate-300 text-sm font-semibold">
                    Você ainda não adicionou nenhum filme à sua lista.
                  </p>
                  <p className="mt-2 text-slate-400 text-sm">
                    Explore filmes e comece sua coleção.
                  </p>
                  <div className="mt-4 flex justify-center">
                    <Link
                      to="/filmes"
                      className="inline-flex items-center justify-center rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-white transition-colors"
                    >
                      Ver filmes
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
