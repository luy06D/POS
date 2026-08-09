import { Injectable } from '@nestjs/common';
import { CloudinaryResponse } from './upload-image.response';
import { v2 as cloudinary } from 'cloudinary'
//import streamifier from 'streamifier'
const streamifier = require('streamifier')

 
@Injectable()
export class UploadImageService {
    uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
        return new Promise<CloudinaryResponse>((resolve, reject) => {

            const uploadStream = cloudinary.uploader.upload_stream(
                (error, result) => {
                    if (error) return reject(error)
                        console.log(JSON.stringify(error, null, 2))
                    if (!result) {
                        return reject(new Error('No se recibió respuesta de Cloudinary'))
                    }
                    resolve(result)
                }
            )

            streamifier.createReadStream(file.buffer).pipe(uploadStream)

        })
    }

}
