import { useComments } from "../hooks/Users/useComments";
import ErrorWindow from "./ErrorWindow";
import Spinner from "./Spinner";
import { formatTime } from "../utils/time";
import BackButton from "./BackButton";
import CommentForm from "./CommentForm";
import { useNavigate, useSearchParams } from "react-router-dom";

function Comment() {
  const { comments, isLoadingComments } = useComments();
  if (isLoadingComments) return <Spinner />;
  if (!comments.length)
    return (
      <>
        <ErrorWindow>No comments</ErrorWindow>
        <BackButton className="absolute right-[2%] top-[0%] md:right-[20%] text-xs space-x-3" />
        <CommentForm />
      </>
    );

  return (
    <ul className="w-[80vw] flex justify-center p-3 text-zinc-100 font-NovaSquare list-none py-8 border-t-[0.5px] border-t-zinc-500 flex-col items-center slowAndSteady gap-2">
      {comments.map((comment) => (
        <CommentsItem key={comment?.id} comment={comment} />
      ))}
      <BackButton className="absolute right-[2%] top-10 md:right-[20%] text-xs space-x-3" />
      <CommentForm />
    </ul>
  );
}

function CommentsItem({ comment }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.set("id", comment?.user_id);

  return (
    <li className="rounded-md px-4 py-2 min-w-[22em] space-y-6 bg-zinc-900/40 shadow-md shadow-zinc-800/40">
      <div className="flex items-end gap-3 border-b-[0.5px] border-b-zinc-400/40">
        <h1
          className="text-sm sm:text-md tracking-wide cursor-pointer"
          onClick={() => {
            setSearchParams(searchParams);
            navigate(`/search/id?=${comment?.user_id}`);
          }}
        >
          {comment?.profiles?.username}
        </h1>
        <span className="text-xs font-light text-zinc-400">
          {formatTime(comment?.created_at)}
        </span>
      </div>
      <p className="text-sm">{comment?.comments}</p>
    </li>
  );
}

export default Comment;
