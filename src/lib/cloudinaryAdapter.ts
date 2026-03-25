import type { Adapter, GeneratedAdapter, HandleUpload, HandleDelete, GenerateURL } from '@payloadcms/plugin-cloud-storage/types'
import { v2 as cloudinary, type ConfigOptions } from 'cloudinary'

export interface CloudinaryAdapterArgs {
  config: ConfigOptions
  folder?: string
}

export const cloudinaryAdapter = ({ config, folder = 'media' }: CloudinaryAdapterArgs): Adapter =>
  (): GeneratedAdapter => {
    cloudinary.config(config)

    const handleUpload: HandleUpload = async ({ data, file }) => {
      await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder,
              public_id: file.filename.replace(/\.[^/.]+$/, ''),  // ✅ filename not name
              overwrite: false,
            },
            (err, result) => { if (err) reject(err); else resolve(result) }
          )
          .end(file.buffer)  // ✅ buffer not arrayBuffer()
      })
    }

    const handleDelete: HandleDelete = async ({ filename }) => {
      const publicId = `${folder}/${filename.replace(/\.[^/.]+$/, '')}`
      await cloudinary.uploader.destroy(publicId)
    }

    const generateURL: GenerateURL = async ({ filename }) => {
      return cloudinary.url(`${folder}/${filename.replace(/\.[^/.]+$/, '')}`, { secure: true })
    }

    return {
    name: 'cloudinary',
    handleUpload,
    handleDelete,
    generateURL,
    staticHandler: async (req, { params: { filename } }) => {
        const url = cloudinary.url(`${folder}/${filename.replace(/\.[^/.]+$/, '')}`, { secure: true })
        return Response.redirect(url, 302)
    },
    }
  }