import { useState } from "react";
import ImageView from "./ImageView";

function ImageGallery({ data }) {
  const imageArray = data?.map((ele) => ele.image);
  const allImages = [].concat(...imageArray.filter(Boolean));

  return (
    <ul className="grid grid-cols-[1fr_1fr_1fr] md:w-[55vw] w-[90vw] pb-[10em] bg-zinc-700/50 rounded-md my-4 list-none p-1">
      {allImages.map((img, i) => (
        <ImageItem data={img} key={i} />
      ))}
    </ul>
  );
}

export function ImageItem({ data }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [currentActive, setCurrentActive] = useState("");

  return (
    <>
      <li
        className="relative h-autop-2 p-[2px] rounded-sm transition-all duration-150 cursor-pointer hoverImage flex justify-center"
        onClick={() => setCurrentActive(data)}
      >
        {!isImageLoaded && <div className="image-loader"></div>}
        <img
          className={`rounded-md w-[150px] h-[140px] sm:w-[200px] sm:h-[200px] md:h-[250px] md:w-[250px] object-cover`}
          src={data}
          alt=""
          onLoad={() => setIsImageLoaded(true)}
        />
      </li>
      {currentActive && (
        <ImageView url={currentActive} collapse={() => setCurrentActive("")} />
      )}
    </>
  );
}

export default ImageGallery;
