/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";

export interface Option {
  value: string | number;
  label: string | number;
}

interface SelectInputProps {
  label: string;
  options: Option[];
  onChange?: (value: string | number) => void;
  value: string | number;
  name: string;
  placeholder?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  value,
  onChange,
  name,
  placeholder,
}) => {
  const [selected, setSelected] = useState<Option | undefined>(
    options.find((option) => option.value === value)
  );
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsToggled(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSelect = (arg: string | number) => {
    const selectedOption = options.find((option) => option.value === arg);
    setSelected(selectedOption);
    setIsToggled(false);
    if (onChange) {
      onChange(arg);
    }
  };

  useEffect(() => {
    handleSelect(value);
  }, [value]);

  return (
    <div className="storm-form-group">
      <label className="storm-form-label" htmlFor={name}>
        {label}
      </label>
      <div className="storm-dropdown">
        <div className="select-box" onClick={() => setIsToggled(!isToggled)}>
          {selected ? selected.label : placeholder}
        </div>
        {isToggled && (
          <div className="options-container">
            {options.map((option) => (
              <div
                key={option.value}
                className="option"
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}

        <select
          style={{ display: "none" }}
          value={selected?.value}
          onChange={(e) => handleSelect(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectInput;
