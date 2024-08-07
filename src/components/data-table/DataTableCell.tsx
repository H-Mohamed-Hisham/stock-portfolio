import React from "react";

type Props = {
  type: string;
  children: React.ReactNode;
};

export const DataTableCell = ({ type, children }: Props) => {
  let _type = "left";
  switch (type) {
    case "left":
      _type = "justify-start";
      break;
    case "center":
      _type = "justify-center";
      break;
    case "right":
      _type = "justify-end";
      break;
    default:
      _type = "justify-center";
  }

  return <div className={`flex ${_type} space-x-2`}>{children}</div>;
};
