import React from 'react';

function Diseno({ index, data, onChange, onRemove }) {
  return (
    <div>
      <input
        name={`precio`}
        placeholder="Precio"
        value={data.precio || ''}
        onChange={e => onChange('Diseno', index, 'precio', e.target.value)}
      />
      <input
        name={`horas`}
        placeholder="Horas"
        value={data.horas || ''}
        onChange={e => onChange('Diseno', index, 'horas', e.target.value)}
      />
      <button type="button" onClick={onRemove}>
        Eliminar Diseño
      </button>
    </div>
  );
}

export default Diseno;