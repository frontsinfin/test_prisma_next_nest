let EasyYandexS3 = require('easy-yandex-s3').default;
import { env } from 'process';
let s3 = new EasyYandexS3({
  auth: {
    accessKeyId: env.ACCESSKEYID,
    secretAccessKey: env.SECRETACCESSKEY,
  },
  Bucket: env.BACKET, // например, "my-storage",
  debug: false, // Дебаг в консоли, потом можете удалить в релизе
});

export const objectStorage = async (
  image: Express.Multer.File,
  folder: string,
) => {
  if (!image) {
    return;
  }
  let upload = await s3.Upload(
    {
      buffer: image.buffer,
      save_name: true,
    },
    folder,
  );

  return upload.Location;
};
