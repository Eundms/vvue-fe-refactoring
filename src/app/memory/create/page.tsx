'use client';

import { BottomButton } from '@components/atoms/button/BottomButton';
import FontSelector from '@components/atoms/fontSelector/FontSelector';
import AddButton from '@components/atoms/iconButtons/AddButton';
import RemoveButton from '@components/atoms/iconButtons/RemoveButton';
import LabelInput, { LabelInputPropsType } from '@components/atoms/input/LabelInput';
import { MainWrapper } from '@components/atoms/wrapper/MainWrapper';
import { CreateMemoryProps, createMemoryApi } from 'apis/memoryApi';
import { uploadImageApi, uploadMultiImageApi } from 'apis/pictureApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getImageId, getImagesId } from 'utils/uploadImage';
import useBottomSheet from 'utils/useBottomSheet';
export type PlaceType = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
  pictures: FileList;
  pictureIds: number[];
};
export type FormValuesType = {
  placeMemories: PlaceMemoriesType[];
  comment: string;
};
export type PlaceMemoriesType = {
  place: PlaceType | never;
  rating: number;
  comment: string;
  placeName: string;
  picture: File;
  pictureId: number;
};
export default function CreateMemoryPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const scheduleId = searchParams.get('scheduleId') ? Number(searchParams.get('scheduleId')) : 1;
  console.log(scheduleId);

  const useFormReturn = useForm({
    defaultValues: {
      placeMemories: [
        {
          place: {
            address_name: '',
            category_group_code: '',
            category_group_name: '',
            category_name: '',
            distance: '',
            id: '',
            phone: '',
            place_name: '',
            place_url: '',
            road_address_name: '',
            x: '',
            y: '',
          },
          rating: -1,
          comment: '',
          placeName: '',
          pictureIds: [],
          pictures: null,
        },
      ],
      comment: '',
      pictureId: -1,
      picture: null,
    },
  });
  // const scheduleId = 1;
  const { control, handleSubmit } = useFormReturn;
  const { fields, append, remove } = useFieldArray({
    name: 'placeMemories',
    control,
  });
  const successNotify = () => toast('추억 작성이 완료되었습니다.');
  const failNotify = () => toast('추억 작성에 실패했습니다.');
  const saveHandler = handleSubmit(async (d) => {
    console.log(d);

    const data: CreateMemoryProps = {
      comment: d.comment,
      pictureId: d.pictureId,
      placeMemories: [],
      scheduleId: scheduleId,
    };
    d.placeMemories.map((place) => {
      data.placeMemories.push({
        comment: place.comment,
        pictureIds: place.pictureIds as number[],
        place: place.place,
        rating: place.rating,
      });
    });
    console.log(data);
    const res = await createMemoryApi(data);
    console.log(res);
    if (res.status === 200) {
      successNotify();
      router.replace(`/memory/${res.data.memoryId}`);
    } else {
      failNotify();
    }
  });
  const { openPopup, closePopup, component } = useBottomSheet();
  const PlaceMemoryInput: LabelInputPropsType[] = [
    {
      useForm: useFormReturn,
      inputType: 'input',
      labelName: '장소',
      inputName: 'place',
      isIcon: true,
      isPlaceSearch: true,
      readOnly: true,
      openPopup: openPopup,
      closePopup: closePopup,
    },
    {
      inputType: 'image',
      labelName: '사진',
      inputName: 'pictures',
    },
    {
      inputType: 'rating',
      labelName: '별점',
      inputName: 'rating',
    },
    {
      inputType: 'textarea',
      labelName: '후기',
      inputName: 'comment',
    },
  ];
  const UserMemoryInput: LabelInputPropsType[] = [
    {
      inputType: 'image',
      labelName: '추억 한 컷',
      inputName: 'picture',
      inputStyle: 'user',
    },
    {
      inputType: 'textarea',
      labelName: '추억 한 마디',
      inputName: 'comment',
      inputStyle: 'user',
    },
  ];
  return (
    <div className='vvue-scroll h-full'>
      <form onSubmit={saveHandler} id='createMemory'>
        {component}
        <div className=' w-100 flex flex-col justify-center items-stretch gap-8 p-4 pb-16'>
          <div className='w-full'>
            <div className='mb-4'>
              <FontSelector fontInfo='jua-regular-24px'>오늘의 장소</FontSelector>
            </div>

            <div className='w-full flex flex-col justify-center items-center gap-2'>
              {fields.map((field, index) => {
                return (
                  <MainWrapper primary round='all' key={field.id}>
                    <RemoveButton onClick={() => remove(index)} />
                    {PlaceMemoryInput.map((d) => (
                      <LabelInput
                        {...d}
                        inputName={`placeMemories.${index}.${d.inputName}`}
                        useForm={useFormReturn}
                        key={`${field.id} ${d.inputName}`}
                        isRequired={d.isRequired}
                        registerOptions={d.registerOptions}
                        idx={index}
                      />
                    ))}
                  </MainWrapper>
                );
              })}
              <AddButton
                onClick={() => {
                  append({
                    place: {
                      address_name: '',
                      category_group_code: '',
                      category_group_name: '',
                      category_name: '',
                      distance: '',
                      id: '',
                      phone: '',
                      place_name: '',
                      place_url: '',
                      road_address_name: '',
                      x: '',
                      y: '',
                    },
                    rating: -1,
                    comment: '',
                    placeName: '',
                    pictureIds: [],
                    pictures: null,
                  });
                }}
              />
            </div>
          </div>
          <div className='w-full'>
            <div className='mb-4'>
              <FontSelector fontInfo='jua-regular-24px'>소감</FontSelector>
            </div>
            <MainWrapper primary round='all'>
              {UserMemoryInput.map((d) => (
                <LabelInput
                  {...d}
                  inputName={d.inputName}
                  useForm={useFormReturn}
                  key={d.inputName}
                  isRequired={d.isRequired}
                  registerOptions={d.registerOptions}
                />
              ))}
            </MainWrapper>
          </div>
        </div>
      </form>
      <BottomButton form='createMemory' type='submit' onClick={() => {}} label={'저장하기'} />
    </div>
  );
}
