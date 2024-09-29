import React, { ChangeEvent } from "react";

interface TextareaProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  name: string;
  rows?: number;
  isDisabled?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  name,
  rows = 3,
  isDisabled = false,
}) => {
  return (
    <div className="storm-form-group">
      <label className="storm-form-label" htmlFor={name}>
        {label}:
      </label>
      <textarea
        id={name}
        value={value}
        onChange={onChange}
        className="storm-form-control storm-form-lg"
        placeholder={placeholder}
        rows={rows}
        disabled={isDisabled}
      />
    </div>
  );
};

export default Textarea;
