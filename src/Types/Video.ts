export interface TVideo {
  id: number;
  user_id: number;
  title: string;
  src: string;
  length?: any;
  extension: string;
  created_at: string;
  updated_at: string;
  slug: string;
  s3_url: string;
  dimensions: string;
  thumbnail: string;

  progress: {
    id: string;
    src: string;
    dimensions: string;
  };
}

export interface TSubtitle {
  end_time: string;
  index: number;
  sentence: string;
  start_time: string;
}

export interface TOptions {
  font_name: string;
  font_size: string;
  font_color: string;
}

export interface TSubtitle {
  end_time: string;
  index: number;
  sentence: string;
  start_time: string;
}

export interface TOptions {
  font_name: string;
  font_size: string;
  font_color: string;
}

export type TProgressData = {
  slug: string;
  width: number;
  height: number;
  start_time: string;
  end_time: string;
};
