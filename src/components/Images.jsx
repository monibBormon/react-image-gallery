import React, { useRef, useState } from "react";
import { imgArr } from "../utils/constant";

const Images = () => {
  const [images, setImages] = useState(imgArr);
  const isSelectLength = images?.filter(
    (item) => item?.isSelect === true
  )?.length;

  //   Select Image Function
  const handleSelectImage = (item) => {
    setImages((prevSelectedImages) => {
      const updatedImages = prevSelectedImages.map((selectedItem) => {
        if (selectedItem.id === item.id) {
          return {
            ...selectedItem,
            isSelect: !selectedItem.isSelect,
          };
        }
        return selectedItem;
      });
      return updatedImages;
    });
  };

  //   Delete Image Function
  const handleDelete = () => {
    const itemsToDelete = images?.filter((item) => item.isSelect);
    if (itemsToDelete.length > 0) {
      setImages((prevImages) => prevImages.filter((item) => !item.isSelect));
    }
  };

  const dragImage = useRef(0);
  const dragOverImage = useRef(0);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    if (dragIndex !== dropIndex) {
      const updatedImages = [...images];
      const [draggedImage] = updatedImages.splice(dragIndex, 1);
      updatedImages.splice(dropIndex, 0, draggedImage);
      setImages(updatedImages);
    }
  };

  //   Sort Function Drag And Drop
  // const handleSortImage = () => {
  //   const imageArrClone = [...images];
  //   const temp = imageArrClone[dragImage.current];
  //   imageArrClone[dragImage.current] = imageArrClone[dragOverImage.current];
  //   imageArrClone[dragOverImage.current] = temp;
  //   setImages(imageArrClone);
  // };

  //   Upload Image function
  const addNewImage = () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.multiple = true;
    inputElement.accept = "image/*";

    inputElement.addEventListener("change", (event) => {
      const selectedFiles = Array.from(event.target.files);
      const newImages = selectedFiles.map((file, i) => ({
        id: `new_${Math.random().toString(36).substr(2, 9)}`,
        img: URL.createObjectURL(file),
        isSelect: false,
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    });
    inputElement.click();
  };

  return (
    <div className="max-w-[1240px] mx-auto p-[0_20px_20px_20px]">
      <div className="py-5 flex items-center justify-between">
        {isSelectLength > 0 ? (
          <h3 className="flex items-center gap-x-2 text-2xl font-semibold">
            {" "}
            <input
              checked
              type="checkbox"
              className={`w-[20px] h-[20px]`}
            />{" "}
            {isSelectLength} Files Selected
          </h3>
        ) : (
          <h2 className=" text-2xl font-semibold">Image Gallery React</h2>
        )}
        {isSelectLength > 0 && (
          <button className="text-red-500 font-semibold" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-5">
        {images?.map((item, index) => (
          <div
            key={item.id}
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
          // <SingleImage
          //   key={i}
          //   item={item}
          //   i={i}
          //   dragImage={dragImage}
          //   dragOverImage={dragOverImage}
          //   handleSelectImage={handleSelectImage}
          //   handleSortImage={handleSortImage}
          // />
        ))}
        {imgArr && imgArr?.length > 0 && (
          <div
            onClick={addNewImage}
            className="flex items-center z-10 justify-center relative cursor-pointer border-[1px] border-slate-300 rounded-[10px] min-w-[100px] min-h-[100px] text-[14px] md:text-[20px] font-semibold before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-slate-700 before:opacity-0 before:rounded-[10px] hover:before:opacity-20 before:duration-300 before:z-[-1]"
          >
            Add Images
          </div>
        )}
      </div>
    </div>
  );
};

export default Images;
