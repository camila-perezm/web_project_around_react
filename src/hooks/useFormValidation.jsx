import { useState, useCallback } from 'react';

export default function useFormValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  //Maneja el cambio de cualquier input
  const handleChange = (e) => {
    const { name, value, validationMessage, validity, form } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: !validity.valid ? validationMessage : '' }));
    setIsValid(form.checkValidity());
  };

  //Limpia todo
  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, []);

  return { values, errors, isValid, handleChange, resetForm, setValues, setIsValid };
}