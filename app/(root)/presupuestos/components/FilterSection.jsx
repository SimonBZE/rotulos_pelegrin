export const FilterSection = ({ title, options, handleFilterChange }) => {
  return (
    <div className="mb-4">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      {options.map((option) => (
        <div key={option} className="mb-1">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-graydark"
              onChange={(e) =>
                handleFilterChange(title.toLowerCase(), option, e.target.checked)
              }
            />
            <span className="ml-2 capitalize">{option}</span>
          </label>
        </div>
      ))}
    </div>
  );
};
