import {useState} from 'react';

export default function useInput<
  T extends HTMLInputElement | HTMLTextAreaElement,
>(maxLength: number) {
  const [value, setValue] = useState<string>('');

  const reset = () => {
    setValue('');
  };

  const handleChange = (e: React.ChangeEvent<T>) => {
    if (value.length <= maxLength) setValue(e.currentTarget.value);
  };

  return {value, handleChange, reset};
}
