import React from "react";
import maxMascotteFlame from "../../assets/max-mascotte-flame.svg";

// Max Voice mascotte — version flamme (Hello-Max branding)
const HandyTextLogo = ({
  width,
  height,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <img
      src={maxMascotteFlame}
      alt="Max"
      width={width}
      height={height}
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
};

export default HandyTextLogo;
