interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button = ({
  children,
  onClick,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#115746] px-8 py-3 rounded-lg text-xl font-medium hover:bg-opacity-90 transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
