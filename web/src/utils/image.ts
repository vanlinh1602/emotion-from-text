import type { RcFile } from 'antd/lib/upload';

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).toString().split(',')[1]);
    reader.onerror = (error) => reject(error);
  });

export const getUrlImageBase64 = (base64: string) => `data:image/jpeg;base64,${base64}`;
