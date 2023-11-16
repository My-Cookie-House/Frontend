import {useState} from 'react';

export default function useInput<
  T extends HTMLInputElement | HTMLTextAreaElement,
>() {
  const [value, setValue] = useState<string>('');

  const reset = () => {
    setValue('');
  };

  const handleChange = (e: React.ChangeEvent<T>) => {
    setValue(e.currentTarget.value);
  };

  return {value, handleChange, reset, setValue};
}
