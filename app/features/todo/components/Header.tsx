import { ReactNode } from "react";

const Header = ({
  title,
  backButton,
  button,
}: {
  title: string;
  button: ReactNode;
  backButton?: ReactNode;
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        {backButton}
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        {button}
      </div>
    </div>
  );
};

export default Header;
