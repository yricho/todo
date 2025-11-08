type ButtonProps = {
  label: string;
  icon: React.ReactNode;
  customStyle: string;
  onClick: () => void;
};

export const Button = ({ label, icon, customStyle, onClick }: ButtonProps) => {
  return (
    <button
      aria-label={label}
      className={`relative flex items-center p-3 space-x-2 rounded-full shadow-md ${customStyle}`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};
