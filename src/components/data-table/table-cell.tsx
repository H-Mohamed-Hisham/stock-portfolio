// Types
import { TDataTableCell } from "@/types";

export const TableCell = ({ cellAlign, children }: TDataTableCell) => {
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
    <div className={`flex items-center ${_cellAlign} space-x-2`}>
      {children}
    </div>
  );
};
