import { ReactNode } from "react";

type HeaderProps = {
  title: string;
  button: ReactNode;
  backButton?: ReactNode;
};

const Header = ({ title, backButton, button }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      {backButton}
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      {button}
    </div>
  );
};

export default Header;
