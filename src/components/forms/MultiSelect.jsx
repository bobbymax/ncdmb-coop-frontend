import makeAnimated from "react-select/animated";
import Select from "react-select";

const MultiSelect = ({
  label,
  value,
  options = [],
  placeholder = "Data",
  onChange,
  isSearchable = false,
  isMulti = false,
  isDisabled = false,
}) => {
  const animated = makeAnimated();
  return (
    <div className="cs__control">
      <label className="storm-form-label" style={{ marginBottom: 7 }}>
        {label}
      </label>
      <Select
        components={animated}
        options={options}
        placeholder={`Select ${placeholder}`}
        value={value}
        onChange={onChange}
        isSearchable={isSearchable}
        isMulti={isMulti}
        isDisabled={isDisabled}
      />
    </div>
  );
};

export default MultiSelect;
