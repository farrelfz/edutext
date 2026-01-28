import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? ''
  }
});

export async function putPdf({ key, body }: { key: string; body: Buffer }) {
  const bucket = process.env.R2_BUCKET ?? '';
  await r2Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: 'application/pdf'
    })
  );
}

export async function getSignedPdfUrl({ key }: { key: string }) {
  const bucket = process.env.R2_BUCKET ?? '';
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key
  });
  return getSignedUrl(r2Client, command, { expiresIn: 60 * 10 });
}
