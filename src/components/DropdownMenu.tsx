import React, { ReactNode } from "react";

const DropdownMenu = (props: {
  isOpen: boolean;
  style: { top: number; left: number };
  children?: ReactNode;
}) => {
  const { isOpen, style, children } = props;
  if (!isOpen) return null;

  return (
    <div
      style={style}
      className="fixed bg-slate-800 p-2 rounded flex flex-col gap-1 w-[300px]"
    >
      {children}
    </div>
  );
};

export default DropdownMenu;
