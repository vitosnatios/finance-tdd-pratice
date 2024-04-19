import { FormEvent } from 'react';

export const handleInputChange = (
  { currentTarget }: FormEvent<HTMLInputElement>,
  field: string,
  setForm: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string;
    }>
  >
) => setForm((p) => ({ ...p, [field]: currentTarget.value }));
