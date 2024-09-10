import { resolve } from "path";
import { env } from "process";

let EasyYandexS3 = require("easy-yandex-s3").default;

// Инициализация
let s3 = new EasyYandexS3({
  auth: {
    accessKeyId: env.ACCESSKEYID,
    secretAccessKey: env.SECRETACCESSKEY,
  },
  Bucket: "sinfinbacket", // например, "my-storage",
  debug: true, // Дебаг в консоли, потом можете удалить в релизе
});
export const objectStorage = async (
  path: string,
  pathfolder: string,
  nameImage: string
) => {
  let upload = await s3.Upload(
    {
      path: resolve(path, nameImage),
      save_name: true,
    },
    pathfolder
  );
  console.log(upload);
  return upload;
};
