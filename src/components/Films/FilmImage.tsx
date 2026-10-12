import { useEffect, useState } from 'react';

export default function FilmImage({ src, alt, className, loading }: { src?: string; alt: string; className?: string; loading?: 'lazy' | 'eager' }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => { setFailed(false); }, [src]);
  if (!src || failed) return <div role="img" aria-label={`${alt}: imagem indisponível`} className={`${className ?? ''} flex min-h-40 items-center justify-center bg-slate-800 text-slate-400 aspect-[2/3]`}><span>Imagem indisponível</span></div>;
  return <img src={src} alt={alt} className={className} loading={loading} onError={() => setFailed(true)} />;
}
