"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "danger";
  fullWidth?: boolean;
}

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ children, variant = "primary", fullWidth = false, className = "", ...props }, ref) => {
    const baseStyles = "px-6 py-2.5 rounded-md font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variants = {
      primary: "bg-[#00C9A7] text-white hover:bg-[#00ddb8] focus:ring-[#00C9A7]",
      outline: "bg-white text-[#00C9A7] border-2 border-[#00C9A7] hover:bg-gray-50 focus:ring-[#00C9A7]",
      danger: "bg-white text-red-600 border-2 border-red-600 hover:bg-red-50 focus:ring-red-500",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PrimaryButton.displayName = "PrimaryButton";
