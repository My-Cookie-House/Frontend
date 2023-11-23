import GoOutModal from '@/components/Modal/GoOutModal/GoOutModal';
import {useState, useCallback} from 'react';

export default function GoOutButton() {
  const [goOutModalOpen, setGoOutModalOpen] = useState(false);
  const handleGoOut = () => setGoOutModalOpen(true);

  const closeGoOutModal = useCallback(
    () => setGoOutModalOpen(false),
    [setGoOutModalOpen],
  );

  return (
    <>
      <button onClick={handleGoOut}>외출하기</button>
      <>
        {goOutModalOpen ? (
          <GoOutModal closeModal={closeGoOutModal} isOpen={goOutModalOpen} />
        ) : (
          <></>
        )}
      </>
    </>
  );
}
