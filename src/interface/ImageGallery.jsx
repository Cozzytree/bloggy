import { useState } from "react";

function ImageGallery({ data, render }) {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr] gap-3 md:w-[55vw] w-[90vw] pb-[10em] bg-zinc-700/50 py-5 px-5 rounded-xl my-4">
      {data?.map(render)}
    </div>
  );
}

export function ImageItem({ data }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="relative h-auto">
      {!isImageLoaded && <div className="image-loader"></div>}
      <img
        className={`rounded-xl min-h-[15em] aspect-auto`}
        src={data.image}
        alt=""
        onLoad={() => setIsImageLoaded(true)}
      />
    </div>
  );
}

export default ImageGallery;
