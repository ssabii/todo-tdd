import React, { FC, useRef, useState } from "react";
import "./Add.css";

interface AddProps {
  onAdd?: (value: string) => void;
}

const Add: FC<AddProps> = ({ onAdd }) => {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    if (e.target.value && isError) {
      setIsError(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;

    if (e.key === "Enter" && value) {
      onAdd?.(value);
      setValue("");
      return;
    }

    if (e.key === "Enter") {
      setIsError(true);
    }
  };

  const handleClick = () => {
    if (value) {
      onAdd?.(value);
      setValue("");
    } else {
      setIsError(true);
    }
    inputRef.current?.focus();
  };

  return (
    <div
      className={["Add", isError && "Add-error"].filter((x) => x).join(" ")}
      data-testid="add-wrapper"
    >
      <input
        className="Add-input"
        type="text"
        placeholder="할 일을 입력하세요."
        data-testid="add-input"
        value={value}
        ref={inputRef}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
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
