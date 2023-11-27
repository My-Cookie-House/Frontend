import {useState} from 'react';
import WriteContentsModal from './WriteContentsModal/WriteContentsModal';
import SelectOrnamentModal from './SelectOrnamentModal/SelectOrnamentModal';
import AlertCreatedModal from './AlertCreatedModal/AlertCreatedModal';

enum WriteGuestBookStep {
  'writeContent' = 0, // 내용 작성
  'selectOrnament', // 오나먼트 선택
  'alertCreated', // '남겼어요'
}

export type Contents = {
  author: string;
  content: string;
};

type Props = {
  closeWriteModal: () => void;
};

export default function WriteGuestBook({closeWriteModal}: Props) {
  const [writeGuestBookStep, setWriteGuestBookStep] =
    useState<WriteGuestBookStep>(WriteGuestBookStep.writeContent);

  const [contents, setContents] = useState<Contents>({author: '', content: ''});
  const [selectedOrnament, setSelectedOrnament] = useState<null | number>(null);

  const setNextStep = () => {
    writeGuestBookStep === WriteGuestBookStep.alertCreated
      ? closeWriteModal()
      : setWriteGuestBookStep((prev) => prev + 1);
  };

  const closeWriteGuestBook = () => {
    closeWriteModal();
  };

  const writeContents = (author: string, content: string) => {
    setContents({author, content});
  };

  return (
    <>
      {writeGuestBookStep === WriteGuestBookStep.writeContent && (
        <WriteContentsModal
          onClose={closeWriteGuestBook}
          setNextStep={setNextStep}
          writeContents={writeContents}
        />
      )}
      {writeGuestBookStep === WriteGuestBookStep.selectOrnament && (
        <SelectOrnamentModal
          onClose={closeWriteGuestBook}
          setNextStep={setNextStep}
          contents={contents}
          selectedOrnament={selectedOrnament}
          setSelectedOrnament={setSelectedOrnament}
        />
      )}
      {writeGuestBookStep === WriteGuestBookStep.alertCreated && (
        <AlertCreatedModal
          onClose={closeWriteGuestBook}
          setNextStep={setNextStep}
          contents={contents}
          selectedOrnament={selectedOrnament}
        />
      )}
    </>
  );
}
