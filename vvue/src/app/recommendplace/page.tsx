import RecommendPlaceOrga from '@components/organisms/recommendPlaceOrga/RecommendPlaceOrga';
import React from 'react';
import { cls } from 'utils/cls';

const RecommendPlace = () => {
  return (
    <div className={cls('w-full h-screen ')}>
      <RecommendPlaceOrga />
    </div>
  );
};

export default RecommendPlace;
