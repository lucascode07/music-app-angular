export interface RecommendationsResponse {
  tracks: Track[];
  seeds:  Seed[];
}

export interface Seed {
  initialPoolSize:    number;
  afterFilteringSize: number;
  afterRelinkingSize: number;
  id:                 string;
  type:               string;
  href:               string;
}

export interface Track {
  album:             Album;
  artists:           Artist[];
  available_markets: string[];
  disc_number:       number;
  duration_ms:       number;
  explicit:          boolean;
  external_ids:      ExternalIDS;
  external_urls:     ExternalUrls;
  href:              string;
  id:                string;
  is_local:          boolean;
  name:              string;
  popularity:        number;
  preview_url:       null | string;
  track_number:      number;
  type:              TrackType;
  uri:               string;
}

export interface Album {
  album_group:            AlbumGroupEnum;
  album_type:             AlbumGroupEnum;
  artists:                Artist[];
  available_markets:      string[];
  external_urls:          ExternalUrls;
  href:                   string;
  id:                     string;
  images:                 Image[];
  name:                   string;
  release_date:           string;
  release_date_precision: ReleaseDatePrecision;
  total_tracks:           number;
  type:                   AlbumType;
  uri:                    string;
}

export enum AlbumGroupEnum {
  Album = "ALBUM",
  Single = "SINGLE",
}

export interface Artist {
  external_urls: ExternalUrls;
  href:          string;
  id:            string;
  name:          string;
  type:          ArtistType;
  uri:           string;
}

export interface ExternalUrls {
  spotify: string;
}

export enum ArtistType {
  Artist = "artist",
}

export interface Image {
  height: number;
  url:    string;
  width:  number;
}

export enum ReleaseDatePrecision {
  Day = "day",
}

export enum AlbumType {
  Album = "album",
}

export interface ExternalIDS {
  isrc: string;
}

export enum TrackType {
  Track = "track",
}
