// import React, { useEffect, useState } from 'react';
// import { UseFormReturn } from 'react-hook-form';
// import { IoSearch } from 'react-icons/io5';
// import FontSelector from '../fontSelector/FontSelector';

// export const SearchPlace = ({
//   closePopup,
//   idx,
//   useForm,
//   ...etc
// }: SearchPlaceProps & { useForm: UseFormReturn<any> } & { idx: number }) => {
//   const { setValue } = useForm;

//   const [placeList, setPlaceList] = useState<any[]>([]);
//   const [keyword, setKeyword] = useState('');
//   const [map, setMap] = useState();
//   useEffect(() => {
//     if (!map) return;
//     if (!keyword) return;
//     if (typeof kakao === 'undefined') return;
//     const ps = new kakao.maps.services.Places();

//     ps.keywordSearch(keyword, (data, status, _pagination) => {
//       if (status === kakao.maps.services.Status.OK) {
//         setPlaceList(data);
//       }
//     });
//   }, [keyword, map]);
//   return (
//     <Map>
//       <div className='flex flex-col w-full h-full gap-2 p-2'>
//         <div>
//           <FontSelector fontInfo='jua-regular-24px'>장소</FontSelector>
//         </div>
//         <div className='relative flex justify-center items-center'>
//           <input
//             className='w-full flex flex-col rounded-lg bg-[#E5F0FF] text-[#757575] justify-center items-center p-2 focus:border-2 focus:outline-none focus:ring ring-[#E5F0FF] focus:border-[#B7D5FF] pr-7'
//             value={keyword}
//             onChange={(evt: any) => {
//               setKeyword(evt.target.value);
//             }}
//             {...etc}
//           />
//           <div className='absolute right-2 text-[#424242] text-[20px]'>
//             <IoSearch color='#424242' fontSize='20px' />
//           </div>
//         </div>
//         {placeList && (
//           <div className=' max-h-full overflow-y-auto '>
//             {placeList.map((place, i) => {
//               return (
//                 <button
//                   key={place.id}
//                   className='w-full text-justify overflow-y-auto p-2 border-b'
//                   onClick={() => {
//                     setValue(`placeMemories.${idx}.place`, place);
//                     setValue(`placeMemories.${idx}.placeName`, place.place_name);
//                     closePopup();
//                   }}
//                 >
//                   <div className=' font-bold truncate'>{place.place_name}</div>
//                   <div className='truncate'>{place.address_name}</div>
//                 </button>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </Map>
//   );
// };
