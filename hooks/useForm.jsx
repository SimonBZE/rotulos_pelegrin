import { useState } from 'react';
import * as Yup from 'yup';


const useForm = (initialValues, validationSchema, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = async(e) => {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? e.target.checked : e.target.value;

    setValues({
      ...values,
      [name]: value
    });

    setTouched({
      ...touched,
      [name]: true
    });
    // Intenta validar el campo que cambió

    try {
      await validationSchema.validateAt(name, { [name]: value });
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: err.message
        }));
      }
    }

    
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
};

  const handleComponentChange = (name, index, fieldName, fieldValue) => {
    const updatedValues = { ...values };
    if (!updatedValues[name]) {
      updatedValues[name] = [];
    }
    if (!updatedValues[name][index]) {
      updatedValues[name][index] = {};
    }
    updatedValues[name][index][fieldName] = fieldValue;
    setValues(updatedValues);
  };

  const addComponent = (name) => {
    const updatedValues = { ...values };
    if (!updatedValues[name]) {
      updatedValues[name] = [];
    }
    updatedValues[name].push({});
    setValues(updatedValues);
  };

  const removeComponent = (name, index) => {
    const updatedValues = { ...values };
    if (updatedValues[name]) {
      updatedValues[name].splice(index, 1);
    }
    setValues(updatedValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(values, { abortEarly: false });
      setErrors({});
      onSubmit(values);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};
        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });
        setErrors(errorMessages);
      } else {
        console.error(err);
      }
    }
  };

  return {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleComponentChange,
    addComponent,
    removeComponent,
    handleSubmit
  };
};

export default useForm;