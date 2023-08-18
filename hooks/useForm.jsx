import { useState } from 'react';

const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
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


// import { useState } from 'react';

// const useForm = (initialValues, onSubmit) => {
//   const [values, setValues] = useState(initialValues);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setValues({
//       ...values,
//       [name]: value
//     });
//   };

//   const handleArrayChange = (name, index, field, value) => {
//     setValues(prev => {
//       const arrayCopy = [...prev[name]];
//       arrayCopy[index][field] = value;
//       return { ...prev, [name]: arrayCopy };
//     });
//   };

//   const handleAddArrayField = (name, object) => {
//     setValues(prev => ({
//       ...prev,
//       [name]: [...prev[name], object]
//     }));
//   };

//   const handleRemoveArrayField = (name, index) => {
//     setValues(prev => {
//       const arrayCopy = [...prev[name]];
//       arrayCopy.splice(index, 1);
//       return { ...prev, [name]: arrayCopy };
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(values);
//   };

//   return {
//     values,
//     handleChange,
//     handleArrayChange,
//     handleAddArrayField,
//     handleRemoveArrayField,
//     handleSubmit
//   };
// };

// export default useForm;
