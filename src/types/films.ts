import type { Id } from './engagement';

export type FilmEntity = {
  id: Id;
  attributes: FilmAttributes;
};

export type FilmListResponse = {
  data: FilmEntity[];
};

export type FilmAttributes = {
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  year: string;
  duration: number;
  trailer: string;
  slug: string;
  curiosities: string;
  card: Relation<MediaEntity>;
};

export type Relation<T> = {
  data: T | null;
};

export type MediaEntity = {
  id: Id;
  attributes: MediaAttributes;
};

export type MediaAttributes = {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: ImageFormat;
    [key: string]: ImageFormat | undefined;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type ImageFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
};
