import React from "react";
import logoImage from "../assets/logo.png";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <img
        src={logoImage}
        alt="Azaroth Logo"
        className="h-12 w-auto" 
      />
    </div>
  );
};

export default Logo;
