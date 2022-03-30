import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { ImageService } from './image.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import DataResponse from 'src/common/response/DataResponse';

const s3 = new AWS.S3();

@Controller('/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (_, file, cb) {
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFiles() files: Express.Multer.File) {
    const res = await this.imageService.uploadImage(files);
    return DataResponse.dataSuccess('파일 업로드 성공', res);
  }
}
