import { useState } from 'react';
import { cls } from './cls';
import Sheet from 'react-modal-sheet';

export const useRecommendBottomSheet = () => {
  const [Target, setTarget] = useState<JSX.Element | null>(null);
  const openPopup = (target: JSX.Element) => setTarget(target);
  const closePopup = (callback?: () => void) => {
    if (callback) callback();
    setTarget(null);
  };
  const isOpen = Target ? true : false;
  const component = (
    <div
      className={cls(
        'fixed w-screen h-screen left-0 bottom-0 flex justify-center items-center',
        Target ? '' : 'hidden'
      )}
    >
      <Sheet isOpen={isOpen} onClose={closePopup} className={cls('mt-72')}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content className='py-4'>{Target}</Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </div>
  );
  return {
    component,
    openPopup,
    closePopup,
    isOpen,
  };
};

export default useRecommendBottomSheet;
