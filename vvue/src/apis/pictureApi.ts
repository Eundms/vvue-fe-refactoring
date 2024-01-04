import axios from 'apis';

const apiUrl = '/pictures';
const uploadApiURL = `${apiUrl}/upload`;
export const uploadMultiImageApi = async (fileList: FileList) => {
  const formData = new FormData();
  for (let i = 0; i < fileList.length; i++) {
    formData.append(`pictures`, fileList[i]);
  }
  console.log(formData);
  const res = await axios.post(`${uploadApiURL}/multi`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};

export const uploadImageApi = async (fileList: FileList) => {
  const formData = new FormData();
  formData.append('picture', fileList[0]);
  console.log(formData);
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
