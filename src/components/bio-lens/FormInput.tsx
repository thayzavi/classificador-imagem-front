"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, hint, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between items-center">
          <label className="text-sm text-gray-700 font-medium">{label}</label>
          {hint && <span className="text-xs text-gray-400">{hint}</span>}
        </div>
        <input
          ref={ref}
          className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00C9A7]/30 focus:border-[#00C9A7] transition-all text-sm ${className}`}
          {...props}
        />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
