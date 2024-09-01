import React from "react";

const DropdownItem = (props: {
  id: number;
  name: string;
  isSelected: boolean;
  img?: string;
  onClick: (id: number) => void;
}) => {
  const { id, name, img, isSelected, onClick } = props;

  return (
    <div
      className={`flex gap-2 items-center p-2 rounded cursor-pointer ${isSelected ? "bg-slate-600" : "hover:bg-slate-700"}`}
      onClick={() => onClick(id)}
    >
      {img && (
        <div className="bg-white w-8 h-8 rounded-md overflow-hidden cursor-pointer">
          <img src={img} alt="" />
        </div>
      )}
      <span className="text-white text-sm ">{name}</span>
    </div>
  );
};

export default DropdownItem;
