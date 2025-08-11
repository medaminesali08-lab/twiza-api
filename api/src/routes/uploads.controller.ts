import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomBytes } from 'crypto';
import { existsSync, mkdirSync } from 'fs';

const uploadDir = process.env.UPLOAD_DIR || './uploads';
if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });

@Controller('uploads')
export class UploadsController {
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (_req, _file, cb) => cb(null, uploadDir),
      filename: (_req, file, cb) => {
        const id = randomBytes(8).toString('hex');
        cb(null, id + extname(file.originalname));
      }
    })
  }))
  upload(@UploadedFile() file: Express.Multer.File){
    const url = `/static/${file.filename}`;
    return { ok:true, url };
  }
}
