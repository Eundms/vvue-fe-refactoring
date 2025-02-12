import { uploadImageApi, uploadMultiImageApi, USED_FOR } from 'apis/pictureApi';

export const getImageId = async (file: FileList, usedFor : USED_FOR) => {
  const result = await uploadImageApi(file, usedFor);
  if (result.status === 200) {
    return result.data.pictureId;
  }
};
export const getImagesId = async (idx: number, fileList: FileList, usedFor: USED_FOR) => {
  console.log(fileList);
  const result = await uploadMultiImageApi(fileList, usedFor);
  console.log(result);
  if (result.status === 200) {
    return result.data.pictureIdList;
  }
};
