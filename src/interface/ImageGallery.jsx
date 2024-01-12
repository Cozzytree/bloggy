import { useState } from "react";

function ImageGallery({ data }) {
  const imageArray = data?.pages[0]?.postsAndLikes?.map((ele) => ele.image);
  const allImages = [].concat(...imageArray.filter(Boolean));
  return (
    <ul className="grid grid-cols-[1fr_1fr_1fr] md:w-[55vw] w-[80vw] pb-[10em] bg-zinc-900/50 rounded-md my-4 list-none p-1 border-[1px] border-lime-500">
      {allImages.map((img, i) => (
        <ImageItem data={img} key={i} />
      ))}
    </ul>
  );
}

export function ImageItem({ data }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
      <li className="relative h-autop-2 p-[2px] rounded-sm transition-all duration-150 cursor-pointer hoverImage flex justify-center">
        {!isImageLoaded && <div className="image-loader"></div>}
        <img
          className={`rounded-md object-cover`}
          src={data}
          alt=""
          onLoad={() => setIsImageLoaded(true)}
        />
      </li>
    </>
  );
}

export default ImageGallery;
