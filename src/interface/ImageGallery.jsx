import { useState } from "react";

function ImageGallery({ data }) {
  const imageArray = data?.pages[0]?.postsAndLikes?.map((ele) => ele.image);
  const allImages = [].concat(...imageArray.filter(Boolean));
  return (
    <ul className="grid grid-cols-3 md:w-[57vw] w-[80vw] pb-[10em] bg-zinc-900/50 rounded-md my-4 list-none p-1">
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
      <li className="w-[100%] relative p-[2px] rounded-sm transition-all duration-150 cursor-pointer hoverImage flex justify-center">
        {!isImageLoaded && <div className="image-loader"></div>}
        <img
          className={`rounded-md object-cover h-[230px] w-[100%]`}
          src={data}
          alt=""
          onLoad={() => setIsImageLoaded(true)}
        />
      </li>
    </>
  );
}

export default ImageGallery;
