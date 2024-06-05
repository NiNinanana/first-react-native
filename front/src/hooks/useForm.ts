import {useEffect, useState} from 'react';

interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => Record<keyof T, string>;
}

const useForm = <T extends Record<string, any>>({
  initialValue,
  validate,
}: UseFormProps<T>) => {
  const [values, setValues] = useState(initialValue);
  const [toucheds, setToucheds] = useState<Record<keyof T, boolean>>(
    Object.fromEntries(
      Object.keys(initialValue).map(key => [key, false]),
    ) as Record<keyof T, boolean>,
  );
  const [errors, setErrors] = useState<Record<keyof T, string>>(
    Object.fromEntries(
      Object.keys(initialValue).map(key => [key, '']),
    ) as Record<keyof T, string>,
  );

  const handleChangeText = (name: keyof T, text: string) => {
    setValues({
      ...values,
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
    setToucheds({
      ...toucheds,
      [name]: true,
    });
  };

  const getTextInputProps = (name: keyof T) => {
    const value = values[name];
    const touched = toucheds[name];
    const error = errors[name];
    const onChangeText = (text: string) => handleChangeText(name, text);
    const onBlur = () => handleBlur(name);

    return {value, onChangeText, onBlur, touched, error};
  };

  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [validate, values]);

  return {getTextInputProps, values, errors};
};

export default useForm;
