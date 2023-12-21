import { useComments } from "../hooks/Users/useComments";
import ErrorWindow from "./ErrorWindow";
import Spinner from "./Spinner";
import { formatTime } from "../utils/time";
import BackButton from "./BackButton";
import CommentForm from "./CommentForm";

function Comment() {
  const { comments, isLoadingComments } = useComments();

  if (isLoadingComments) return <Spinner />;
  if (!comments.length)
    return (
      <>
        <ErrorWindow>No comments</ErrorWindow>
        <BackButton className="absolute right-[5%] md:right-[20%] text-xs space-x-3" />
        <CommentForm />
      </>
    );

  return (
    <ul className="w-[100%] flex justify-center p-3 text-zinc-100 font-NovaSquare list-none py-8 border-t-[0.5px] border-t-zinc-500 flex-col items-center">
      {comments.map((comment) => (
        <CommentsItem key={comment.post_id} comment={comment} />
      ))}
      <BackButton className="absolute right-[5%] md:right-[20%] text-xs space-x-3" />
      <CommentForm />
    </ul>
  );
}

function CommentsItem({ comment }) {
  return (
    <li className="bg-zinc-600/40 rounded-md px-4 py-2 min-w-[20em] space-y-6">
      <div className="flex items-end gap-3 border-b-[0.5px] border-b-zinc-400/40">
        <h2>{comment?.profiles?.username}</h2>
        <span className="text-[0.7em] font-light tracking-wide">
          {formatTime(comment?.created_at)}
        </span>
      </div>
      <p>{comment?.comments}</p>
    </li>
  );
}

export default Comment;
