import React from "react";

const SingleImage = ({
  item,
  index,
  handleSelectImage,
  handleDragStart,
  handleDragOver,
  handleDrop,
}) => {
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDragOver={(e) => handleDragOver(e, index)}
      onDrop={(e) => handleDrop(e, index)}
      className={`relative overflow-hidden group rounded-[10px] first:col-span-2 first:row-span-2 ${
        item?.isSelect
          ? "after:absolute after:w-full after:h-full after:bg-slate-400 after:opacity-40 after:left-0 after:top-0"
          : "before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-slate-700 before:opacity-0 before:rounded-[10px] hover:before:opacity-50 before:duration-300"
      }`}
    >
      <input
        checked={item?.isSelect}
        onChange={() => handleSelectImage(item)}
        type="checkbox"
        className={`z-10 absolute left-[20px] top-[20px] w-[20px] h-[20px] ${
          item?.isSelect ? "block" : "hidden"
        } group-hover:block duration-300`}
      />
      <img
        className="rounded-[10px] border-[1px] border-slate-200"
        src={item?.img}
        alt="gallery image"
      />
    </div>
  );
};

export default SingleImage;
