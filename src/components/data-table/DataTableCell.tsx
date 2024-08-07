import React from "react";

type Props = {
  cellAlign: string;
  isRupees?: boolean;
  children: React.ReactNode;
};

export const DataTableCell = ({
  cellAlign,
  children,
  isRupees = false,
}: Props) => {
  let _cellAlign = "left";
  switch (cellAlign) {
    case "left":
      _cellAlign = "justify-start";
      break;
    case "center":
      _cellAlign = "justify-center";
      break;
    case "right":
      _cellAlign = "justify-end";
      break;
    default:
      _cellAlign = "justify-center";
  }

  return (
    <div className={`flex ${_cellAlign} space-x-2`}>
      {isRupees && "₹"} {children}
    </div>
  );
};
