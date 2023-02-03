import { MediaType } from './../enums/media-type.enum';

export const getMediaType = (fileType: string) => {
  if (fileType.startsWith('image')) return MediaType.IMAGE;
  if (fileType.startsWith('video')) return MediaType.VIDEO;
  return MediaType.ATTACHMENT;
};
