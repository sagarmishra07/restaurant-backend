import { S3 } from 'aws-sdk';
import {
  Logger,
  Injectable,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ImageuploadService {
  async upload(file) {
    const { originalname }: any = file;
    const bucketS3 = process.env.AWS_BUCKET_NAME;

    let imageReturnedFromAWS: any = await this.uploadS3(
      file.buffer,
      bucketS3,
      originalname,
    );

    if (imageReturnedFromAWS) {
      return {
        status: HttpStatus.OK,
        message: 'Image Uploaded',
        data: { ...imageReturnedFromAWS },
      };
    } else {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Upload Failed',
      };
    }
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    const randomNumber = Math.floor(Math.random() * 10);
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);

          reject('Error Uploaded');
        }
        resolve(data);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }
}
