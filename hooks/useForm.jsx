import { useState } from 'react';

const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? e.target.checked : e.target.value;

    setValues({
      ...values,
      [name]: value
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

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(values);

    // console.log(onSubmit(values))
  };

  return {
    values,
    handleChange,
    handleComponentChange,
    addComponent,
    removeComponent,
    handleSubmit
  };
};

export default useForm;