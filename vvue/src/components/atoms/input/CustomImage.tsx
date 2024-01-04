import React, { useMemo, useState } from 'react';
import { cls } from 'utils/cls';
import { IoImages } from 'react-icons/io5';
import ImagePreview from '../image/ImagePreview';
import RemoveButton from '../iconButtons/RemoveButton';
import { LABEL_TYPE } from './LabelInput';
import { UseFormReturn } from 'react-hook-form';
import { getImageId, getImagesId } from 'utils/uploadImage';
import { deleteImageApi, deleteMultiImageApi } from 'apis/pictureApi';
import { PictureProps } from 'apis/memoryApi';

export interface CustomImageProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  useForm: UseFormReturn<any>;
  inputStyle: LABEL_TYPE;
  idx?: number;
  pictureId?: number;
}
// eslint-disable-next-line react/display-name
export const CustomImage = React.forwardRef<HTMLInputElement, CustomImageProps>((props, ref) => {
  const { useForm, inputStyle = 'place', idx = -1, pictureId, ...etc } = props;
  const { setValue } = useForm;
  const [showImages, setShowImages] = useState<PictureProps[]>([]);
  const [uploadImages, setUploadImages] = useState<FileList | null>();

  const canAddImage = useMemo(() => {
    if (inputStyle === 'place' && showImages.length >= 5) {
      return false;
    } else if (inputStyle === 'user' && showImages.length >= 1) {
      return false;
    } else return true;
  }, [inputStyle, showImages.length]);
  const handleAddImages = async (event: any) => {
    let imageLists = event.target.files;
    if (!imageLists) return;
    if (inputStyle === 'place' && Array.isArray(imageLists) && imageLists.length > 5) {
      imageLists = imageLists.slice(0, 5);
    }
    if (inputStyle === 'user' && Array.isArray(imageLists) && imageLists.length > 1) {
      imageLists = imageLists.slice(0, 1);
    }

    const dataTranster = new DataTransfer();
    uploadImages &&
      Array.from(uploadImages).forEach((file) => {
        dataTranster.items.add(file);
      });
    for (let i = 0; i < Math.min(5, imageLists.length); i++) {
      dataTranster.items.add(imageLists[i]);
    }
    console.log(dataTranster.files);
    setUploadImages(dataTranster.files);
    let imageId, imageListId;
    if (inputStyle === 'user') {
      imageId = await getImageId(dataTranster.files);
      console.log(imageId);
      setValue(`pictureId`, imageId);
      setValue(`picture`, dataTranster.files);
    } else if (inputStyle === 'place') {
      imageListId = await getImagesId(idx, dataTranster.files);
      console.log(imageListId);
      setValue(`placeMemories.${idx}.pictureIds`, imageListId);
      setValue(`placeMemories.${idx}.pictures`, dataTranster.files);
    }

    let imageUrlLists = showImages ? [...showImages] : [];
    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push({
        id: inputStyle === 'place' ? imageListId[i] : imageId,
        url: currentImageUrl as never,
      });
    }

    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5);
    }

    setShowImages && setShowImages(imageUrlLists);
  };

  const handleDeleteImage = async (id: number, imageId: number) => {
    console.log(imageId);
    const dataTranster = new DataTransfer();
    uploadImages &&
      Array.from(uploadImages)
        .filter((file, i) => i != id)
        .forEach((file) => {
          dataTranster.items.add(file);
        });
    const filtered = showImages.filter((v, i) => {
      return i !== id;
    });
    const res = await deleteImageApi(imageId);
    if (res.status === 200) {
      setShowImages([...filtered]);
      setUploadImages(dataTranster.files);
      if (inputStyle === 'place') {
        setValue(`placeMemories.${idx}.pictures`, dataTranster.files);
        for (let i = 0; i < filtered.length; i++) {
          setValue(`placeMemories.${idx}.pictureIds.${i}`, filtered[i].id);
        }
      } else {
        setValue(`placeMemories.picture`, dataTranster.files);
        setValue(`pictureId`, filtered ? filtered[0].id : null);
      }
    } else {
    }
  };

  const getSizeClasses = (inputStyle: string) => {
    if (inputStyle === 'place') {
      return 'w-20';
    } else {
      return 'w-full';
    }
  };
  const computedClasses = useMemo(() => {
    const sizeClass = getSizeClasses(inputStyle);

    return [sizeClass].join(' ');
  }, [inputStyle]);

  return (
    <div className='w-full flex overflow-y-auto gap-2'>
      {showImages &&
        showImages.map((image, id) => (
          <div key={id} className={cls('w-fit relative flex flex-nowrap flex-shrink-0')}>
            <ImagePreview
              inputStyle={inputStyle}
              src={image.url}
              alt={`${image.id}`}
              useForm={useForm}
            />
            <RemoveButton
              color='gray'
              size={30}
              type='button'
              className='absolute right-0'
              onClick={() => {
                console.log(image);
                handleDeleteImage(id, image.id);
              }}
            />
          </div>
        ))}
      <input
        id={inputStyle === 'place' ? `placeMomeries.${idx}.pictureId.${pictureId}` : 'pictureId'}
        type={'file'}
        hidden
        accept='image/*'
        multiple={inputStyle === 'place' ? true : false}
        onChange={(e) => handleAddImages(e)}
        ref={ref}
        {...etc}
      />
      {canAddImage ? (
        <label
          htmlFor={
            inputStyle === 'place' ? `placeMomeries.${idx}.pictureId.${pictureId}` : 'pictureId'
          }
          className={cls(
            inputStyle === 'place' ? 'w-fit' : 'w-full',
            ` flex items-center justify-center`
          )}
        >
          <div
            className={`flex items-center justify-center gap-2 border rounded-lg border-[#8ABBFF] text-[#8ABBFF] aspect-square ${computedClasses}`}
          >
            <IoImages />
          </div>
        </label>
      ) : (
        <></>
      )}
    </div>
  );
});

export default CustomImage;
