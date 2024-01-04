import { uploadImageApi, uploadMultiImageApi } from 'apis/pictureApi';

export const getImageId = async (file: FileList) => {
  console.log(file);
  const result = await uploadImageApi(file);
  console.log(result);
  if (result.status === 200) {
    return result.data.pictureId;
  }
};
export const getImagesId = async (idx: number, fileList: FileList) => {
  console.log(fileList);
  const result = await uploadMultiImageApi(fileList);
  console.log(result);
  if (result.status === 200) {
    return result.data.pictureIdList;
  }
};
