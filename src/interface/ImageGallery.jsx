function ImageGallery({ data, render }) {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 md:w-[55vw] w-[90vw] pb-[10em] bg-zinc-700/50 py-5 px-5 rounded-xl my-4">
      {data.posts.map(render)}
    </div>
  );
}

export function ImageItem({ data }) {
  console.log(data);
  return <img className="rounded-xl aspect-auto" src={data.image} alt="" />;
}

export default ImageGallery;
