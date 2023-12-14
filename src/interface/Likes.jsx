import { AiOutlineLike } from "react-icons/ai";
import Button from "./Button";

function Likes() {
  return (
    <ul>
      <li>
        <Button
          type="like"
          className="flex items-center justify-center gap-1 text-[0.8em] px-4 py-1 border-[1px] border-lime-500 rounded-md"
        >
          Like <AiOutlineLike size={15} />
        </Button>
      </li>
    </ul>
  );
}

export default Likes;
