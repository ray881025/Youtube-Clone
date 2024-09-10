import { httpsCallable, HttpsCallableResult } from 'firebase/functions';
import { functions } from './firebase';

const generateUploadUrlFunction = httpsCallable(functions, 'generateUploadUrl');
const getVideosFunction = httpsCallable(functions, 'getVideos');

export interface Video {
  id?: string;
  uid?: string;
  filename?: string;
  status?: 'processing' | 'processed';
  title?: string;
  description?: string;
}

interface GenerateUploadUrlResponse {
  url: string;
  fileName: string;
}

export async function uploadVideo(file: File) {
  // Call the generateUploadUrl function
  const response = await generateUploadUrlFunction({
    fileExtension: file.name.split('.').pop() || '',
  }) as HttpsCallableResult<GenerateUploadUrlResponse>;

  // Extract the data from the response
  const { url } = response.data;

  // Upload the file to the signed URL
  const uploadResult = await fetch(url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  return uploadResult;
}

export async function getVideos(): Promise<Video[]> {
  const response = await getVideosFunction() as HttpsCallableResult<Video[]>;
  return response.data as Video[];
}