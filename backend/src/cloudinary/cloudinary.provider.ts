import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dqtrwlftw',
      api_key: '578769964353182',
      api_secret: '_ADOs3xeMELqEJKDstmoYFQPoaI',
    });
  },
};
