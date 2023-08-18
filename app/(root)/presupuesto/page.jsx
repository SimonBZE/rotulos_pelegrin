'use client'
import React from 'react';
import useForm from '@/hooks/useForm';
import Diseno from './components/Diseno'; // Importa los componentes según los hayas definido
// Importa los demás componentes...

function MiFormulario() {
  const initialValues = {
    "Nombre": "",
    // ... los demás campos iniciales
    "Diseno": [],
    "Impresion": [],
    // ... y así sucesivamente
  };

  const { values, handleChange, handleComponentChange, addComponent, removeComponent, handleSubmit } = useForm(initialValues, (formData) => {
    console.log('Datos enviados:', formData);
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="Nombre"
        placeholder="Nombre"
        value={values.Nombre}
        onChange={handleChange}
      />
      {/* ... los demás campos principales ... */}

      {values.Diseno.map((_, index) => (
        <Diseno
          key={index}
          index={index}
          data={values.Diseno[index]}
          onChange={handleComponentChange}
          onRemove={() => removeComponent('Diseno', index)}
        />
      ))}
      <button type="button" onClick={() => addComponent('Diseno')}>Agregar Diseño</button>

      {/* ... y así sucesivamente para los demás componentes ... */}
      
      <button type="submit">Enviar</button>
    </form>
  );
}

export default MiFormulario;