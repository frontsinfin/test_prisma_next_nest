import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
import { getImage } from './untils/formidable';
import { PrismaService } from 'src/prisma.service';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  constructor(private prismaService: PrismaService) {}

  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
  async handle(req, res) {
    const imageUploaded = await getImage(req);

    const imageData = await this.uploadFile(imageUploaded.path);

    const result = await this.prismaService.categoryImage.create({
      data: {
        publicId: imageData.public_id,
        format: imageData.format,
        version: imageData.version.toString(),
      },
    });

    res.json(result);
  }
}
