import Button from "./Button";
import { useAddComment } from "../hooks/Users/useAddComment";
import { useState } from "react";
import { useParams } from "react-router-dom";

function CommentForm() {
  const { isCommenting, createComment } = useAddComment();
  const [input, setInput] = useState("");
  const { commentId } = useParams();

  function handleAddComent(e) {
    e.preventDefault();
    if (!input) return;
    createComment({ postID: Number(commentId), content: input });
  }
  return (
    <form
      className="absolute bottom-20 space-x-2 text-zinc-50"
      onSubmit={handleAddComent}
    >
      {isCommenting && (
        <p className="text-center py-5 tracking-wider">Commenting...</p>
      )}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="writeComment"
        className="bg-transparent focus:outline-none focus:ring-[1px] ring-lime-400 px-3 py-1 rounded-full border-[1px] border-zinc-400"
      />
      <Button className="w-[3.5em] text-xs rounded-full py-1" type="small">
        Add
      </Button>
    </form>
  );
}

export default CommentForm;
