import * as fs from 'fs'
import * as fsPromises from 'fs/promises'
import * as path from 'path'
import archiver from 'archiver'

interface PackImageZipOptions {
  imagesDirectory: string
  outputZipPath: string
  images: string[]
}

export async function packImageZip(options: PackImageZipOptions): Promise<void> {
  const { imagesDirectory, outputZipPath, images } = options

  // 创建文件流
  const output = fs.createWriteStream(outputZipPath)
  const archive = archiver('zip', {
    zlib: { level: 9 }, // 压缩等级
  })

  // 将archive与output链接
  archive.pipe(output)

  // 将imagesDirectory中的图像文件添加到archive
  const files = await fsPromises.readdir(imagesDirectory)
  for (const file of files) {
    const filePath = path.join(imagesDirectory, file)
    if (path.extname(file).match(/\.(jpg|jpeg|png|gif)$/) && ( !images || images.includes(file)))
      archive.file(filePath, { name: file })
  }

  // 完成压缩
  archive.finalize()

  return new Promise<void>((resolve, reject) => {
    output.on('close', () => resolve())
    archive.on('warning', err => reject(err))
    archive.on('error', err => reject(err))
  })
}

// 异步删除图片
export function deleteImage(path) {
  fs.unlink(path, (error) => {
    if (error)
      console.error('删除图片失败:', error)
    else
      console.log('图片删除成功:', path)
  })
}

// 拷贝目录下文件
export function copyDir(sourceDir, targetDir) {
  try {
    if (!fs.existsSync(sourceDir))
      return

    // 确保目标目录存在
    if (!fs.existsSync(targetDir))
      fs.mkdirSync(targetDir, { recursive: true })

    // 读取源目录下的所有文件
    const files = fs.readdirSync(sourceDir)

    // 复制每个文件到目标目录
    files.forEach((file) => {
      const sourceFile = path.join(sourceDir, file)
      const targetFile = path.join(targetDir, file)
      fs.copyFileSync(sourceFile, targetFile)
    })
    return true
  }
  catch (error) {
    console.error('拷贝目录失败:', error)
    return false
  }
}
