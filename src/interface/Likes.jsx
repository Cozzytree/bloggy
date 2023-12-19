import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import Button from "./Button";

function Likes({ length, liked, addLike, removeLike, isProcessing }) {
  const { isLiking, isUnliking } = isProcessing;
  return (
    <ul>
      <li>
        <Button
          disabled={isLiking || isUnliking || false}
          onClick={liked ? removeLike : addLike}
          type="like"
          className={`${
            liked ? "bg-lime-400 text-zinc-900 font-black" : null
          } flex items-center justify-center gap-1 text-[0.8em] px-4 py-1 border-[1px] border-lime-500 rounded-md w-[5em] transition-all duration-150 h-[3em] relative`}
        >
          {((isLiking || isUnliking) && (
            <div className="like-spinner">
              <AiOutlineLoading3Quarters size={20} />
            </div>
          )) ||
            (liked && <AiFillLike size={15} />) || <AiOutlineLike size={15} />}
        </Button>

        <span>
          {liked &&
            (length === 1
              ? "You liked the post"
              : `You and ${length - 1} people liked the post`)}
          {!liked && length >= 1 && `${length} people liked the post`}
        </span>
      </li>
    </ul>
  );
}

export default Likes;
