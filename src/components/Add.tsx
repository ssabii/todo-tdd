import React, { FC, useState } from "react";
import "./Add.css";

interface AddProps {
  onAdd?: (value: string) => void;
}

const Add: FC<AddProps> = ({ onAdd }) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAdd?.(value);
      setValue("");
    }
  };

  const handleClick = () => {
    onAdd?.(value);
    setValue("");
  };

  return (
    <div className="Add">
      <input
        className="Add-input"
        value={value}
        type="text"
        placeholder="할 일을 입력하세요."
        data-testid="add-input"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className="Add-button"
        type="button"
        data-testid="add-button"
        onClick={handleClick}
      >
        추가
      </button>
    </div>
  );
};

export default Add;
