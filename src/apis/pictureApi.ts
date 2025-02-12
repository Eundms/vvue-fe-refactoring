import axios from 'apis';

const apiUrl = '/pictures';
const uploadApiURL = `${apiUrl}/upload`;

export type ACCESS_LEVEL = 'PUBLIC' | 'MARRIED' | 'PRIVATE'; 
export type USED_FOR = 'USER_PROFILE' | 'MARRIED_RELATED';

export const uploadMultiImageApi = async (fileList: FileList, usedFor: USED_FOR) => {
  const formData = new FormData();
  for (let i = 0; i < fileList.length; i++) {
    formData.append(`pictures`, fileList[i]);
  }
  formData.append('meta', new Blob([JSON.stringify({ usedFor })], { type: 'application/json' }));
  console.log(formData);
  const res = await axios.post(`${uploadApiURL}/multi`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};

export const uploadImageApi = async (fileList: FileList, usedFor: USED_FOR) => {
  const formData = new FormData();
  formData.append('picture', fileList[0]);
  console.log(formData);
  formData.append('meta', new Blob([JSON.stringify({ usedFor })], { type: 'application/json' }));

  const res = await axios.post(`${uploadApiURL}/single`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};

export const deleteMultiImageApi = async (pictureIdList: number[]) => {
  const res = await axios.delete(`${apiUrl}/multi`, { data: { pictureIdList } });
  return res;
};

export const deleteImageApi = async (pictureId: number) => {
  const res = await axios.delete(`${apiUrl}/single/${pictureId}`);
  return res;
};
