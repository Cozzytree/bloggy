import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import Button from "./Button";
import MiniSpinner from "./MiniSpinner";

function Likes({ length, liked, addLike, removeLike, isProcessing }) {
  const { isLiking, isUnliking } = isProcessing;
  return (
    <ul>
      <li>
        <Button
          disabled={isLiking || isUnliking}
          onClick={liked ? removeLike : addLike}
          type="like"
          className={`${
            liked ? "border-lime-500 text-zinc-900 font-black" : null
          } flex items-center justify-center gap-1 text-[0.8em] px-4 border-[1px] rounded-md w-[4em] md-w-[5em] transition-all duration-150 relative border-zinc-700/50 h-[2em]`}
        >
          {((isLiking || isUnliking) && <MiniSpinner width={4} height={4} />) ||
            (liked && (
              <AiFillLike size={15} fill="lime" className="w-[12px] md:w-14" />
            )) || <AiOutlineLike size={15} />}
        </Button>

        <span className="text-[0.65em] md:text-md tracking-wide whitespace-nowrap">
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
