import React from "react";
import logoImage from "../assets/logo.png";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className="flex items-center">
      <img
        src={logoImage}
        alt="Azaroth Logo"
        className={`h-12 w-auto ${className}`}
      />
    </div>
  );
};

export default Logo;
