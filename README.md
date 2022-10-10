# R2 signed URL test

Test out creating a signed url for Cloudflare's R2 that allows the user to upload a specific file with a given sha256 checksum, using the aws-sdk.

Pass the file to the script and it provides the upload URL as a curl command to try it out.

Heavily based on https://developers.cloudflare.com/r2/examples/aws-sdk-js-v3/

## Getting started

With node v16 installed, install the deps (`npm i`), create your `.env` file from `.env.tpl`, and and run the index.js

```bash
# pass a file you want to create an upload URL for
❯ node index.js olizilla.car
sha fhJ6TnbgLSToSkB936l5tzlhL/PuWCN+ggwrxpUr5ik=
curl -X PUT "https://r2-test.fffa4b4363a7e5250af8357087263b3a.r2.cloudflarestorage.com/olizilla.car?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=309e401cdaab457aa9cfc6746e981134%2F20221005%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20221005T112921Z&X-Amz-Expires=3600&X-Amz-Signature=7725ba8b3e3e76deb8e14dda2975452c10ab3f5d824b01dee913984299b683d8&X-Amz-SignedHeaders=host&x-amz-checksum-sha256=fhJ6TnbgLSToSkB936l5tzlhL%2FPuWCN%2BggwrxpUr5ik%3D&x-id=PutObject" -F "data=@olizilla.car"
```

You can then copypasta and run that curl command in the same dir to upload the file to R2 usin the signed URL magic.

O!