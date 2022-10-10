import { readFileSync } from 'node:fs'
import {
  S3Client,
  PutObjectCommand
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { sha256 } from 'multiformats/hashes/sha2'
import { toString } from 'uint8arrays'
import * as dotenv from 'dotenv'

dotenv.config()
const { ACCOUNT_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET } = process.env
const key = process.argv[2]

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
})

const bytes = readFileSync(key)
const mhash = await sha256.digest(bytes)
const sha = toString(mhash.digest, 'base64pad')

console.log('sha', sha)

const signedUrl = await getSignedUrl(S3, new PutObjectCommand({
  Bucket: BUCKET, 
  Key: key,
  ChecksumSHA256:  sha
}), { expiresIn: 3600 })

console.log(
  `curl -X PUT "${signedUrl}" -F "data=@${key}"`
)
