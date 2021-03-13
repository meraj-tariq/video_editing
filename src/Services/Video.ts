import { TEditInfo } from "../Components/ProgressContext";
import environment from "../Config/Environment";
import { TOptions, TSubtitle } from "../Types/Video";
import api from "./Api";

const { veegixUrl } = environment;

export const uploadVideoService = async (file: File) => {
  const fd = new FormData();
  fd.append("video", file);
  const response: any = await api.Post(`${veegixUrl}/upload`, fd);
  return response;
};

export const downloadVideoService = async (job: string) => {
  const response: any = await api.Get(`${veegixUrl}/result/${job}?file=true`);
  return response;
};

export const getAllVideosService = async () =>
  await api.Get(`${veegixUrl}/videos`);

export const refreshVideosService = async () => {
  const response = await api.Get(`${veegixUrl}/videos`);
  return response;
};

export const deleteVideoService: any = async (slug: string) =>
  await api.Get(`${veegixUrl}/videos/delete/${slug}`);

export const burnSrtService = async (
  slug: string,
  srtObjects?: TSubtitle[] | File,
  options?: TOptions,
  isUpload?: boolean
) => {
  const fd = new FormData();
  fd.append("slug", slug);
  fd.append("srt", srtObjects as File);
  const response: any = await api.Post(
    `${veegixUrl}/burnSRT`,
    isUpload
      ? fd
      : {
          slug,
          srtObjects,
          options,
        }
  );
  return response;
};

export const transcribeVideoService = async (slug: string) => {
  const response: any = await api.Post(`${veegixUrl}/transcribe`, { slug });
  return response;
};

export const geSubtitleService = async (slug: string) => {
  const response: any = await api.Get(`${veegixUrl}/transcribe/${slug}`);
  return response;
};

export const getLanguageService = async () => {
  const response: any = await api.Get(`${veegixUrl}/translate/languages`);
  return response;
};

export const postLanguageService = async (
  slug: string,
  srtObjects: TSubtitle[],
  language: string
) => {
  const response: any = await api.Post(`${veegixUrl}/translate`, {
    slug,
    srtObjects,
    language,
  });
  return response;
};

export const downloadSubtitleService = async (slug: string) => {
  const response: any = await api.Get(
    `${veegixUrl}/transcribe/${slug}?file=true`
  );
  return response;
};

export const getVideoResultService = async (job: number) => {
  const response: any = await api.Get(`${veegixUrl}/result/${job}`);
  return response;
};

export const trimVideoService = async (
  slug: string,
  start_time: string,
  end_time: string,
  isJob: boolean
) => {
  const response: any = await api.Post(`${veegixUrl}/clip`, {
    ...(isJob ? { id: slug } : { slug }),
    start_time,
    end_time,
  });
  return response;
};

export const resizeVideoService = async (
  slug: string,
  x: number,
  y: number,
  isJob: boolean,
  isRatio: boolean
) => {
  const response: any = await api.Post(`${veegixUrl}/resize`, {
    ...(isJob ? { id: slug } : { slug }),

    ...(isRatio
      ? {
          ratio: {
            x,
            y,
          },
        }
      : {
          dimensions: {
            x,
            y,
          },
        }),
  });
  return response;
};

export const saveEditProgressService = async (data: TEditInfo) => {
  const response: any = await api.Post(`${veegixUrl}/clip_resize`, {
    original: data.original,
    id: data.id,
    clip: data.clip,
    resize: data.resize,
    ...(data.ratio ? { ratio: data.ratio } : null),
    ...(data.dimensions ? { dimensions: data.dimensions } : null),
    start_time: data.start_time,
    end_time: data.end_time,
  });

  return response;
};

export const saveProgressService = async (slug: string, jobId: string) => {
  const response = await api.Post(`${veegixUrl}/videos/save_progress`, {
    slug,
    job_id: jobId,
  });

  return response;
};

export const getFrameService = async (
  time_code: string,
  slug: string,
  isJob: boolean
) => {
  const response = await api.Post(`${veegixUrl}/get_frame`, {
    time_code,
    ...(isJob ? { id: slug } : { slug }),
  });

  return response;
};

export const MakeGifService = async (
  start_time: string,
  end_time: string,
  scale: number,
  slug: string,
  isJob: boolean
) => {
  const response = await api.Post(`${veegixUrl}/make_gif`, {
    start_time,
    end_time,
    scale,
    ...(isJob ? { id: slug } : { slug }),
  });

  return response;
};

export const uploadLinkService = async (url: string) => {
  const response = await api.Post(`${veegixUrl}/upload_link`, { url });
  return response;
};

export const getWatermarkService = async () => {
  const response:any = await api.Get(`${veegixUrl}/watermark`);
  return response;
};

export const uploadWatermarkLogoService = async (file: File) => {
  const fd = new FormData();
  fd.append("image", file);
  const response = await api.Post(`${veegixUrl}/watermark`, fd);
  return response;
};

export const postWatermarkService = async (
  slug: string,
  options: { x_offset?: number; y_offset?: number; position: string },
  isJob: boolean
) => {
  const response:any = await api.Post(`${veegixUrl}/watermark/add`, {
    ...(isJob ? { id: slug } : { slug }),
    options: options,
  });
  return response;
};
