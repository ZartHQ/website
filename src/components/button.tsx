import React from "react";
import { Loader2 } from "lucide-react"; // Import the spinner icon from lucide-react

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean; // New prop to control the loading state
  loadingText?: string; // Optional text to show while loading
}

export const Button = ({
  children,
  onClick,
  className = "",
  isLoading = false, // Default value is false
  loadingText,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#115746] px-8 py-3 rounded-lg text-xl font-medium hover:bg-opacity-90 transition-colors ${
        isLoading ? "cursor-not-allowed opacity-80" : ""
      } ${className}`}
      disabled={isLoading || disabled} // Disable the button while loading
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="inline mr-2 h-5 w-5 animate-spin" />
          {loadingText || children}
        </>
      ) : (
        children
      )}
    </button>
  );
};