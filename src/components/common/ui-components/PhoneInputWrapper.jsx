import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInputWrapper = ({
  value,
  onChange,
  error = false,
}) => {
  return (
    <div className="mb-4">
      <PhoneInput
        country={"in"}
        value={value}
        onChange={onChange}
        inputClass={error ? "input-error w-full" : "w-full"}
        containerClass="w-full"
        buttonClass="bg-white"
      />

      {error && (
        <p className="text-red-600 text-xs mt-1 ml-1">
          Please enter a valid phone number
        </p>
      )}
    </div>
  );
};

export default PhoneInputWrapper;
