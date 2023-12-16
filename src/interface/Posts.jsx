import { HiOutlineDotsHorizontal } from "react-icons/hi";

import { useState } from "react";
import Button from "./Button";
import Column from "./Column";
import { useDeletePost } from "../hooks/Users/useDeletePosts";
import Spinner from "./Spinner";
import Likes from "./Likes";
import { useCurrentUser } from "../hooks/Users/useCurrentUser";
import { useLikePost } from "../hooks/Users/useLikePost";

function Posts({ data, render }) {
  return (
    <ul className="flex flex-col gap-4 md:w-[55vw] w-[90vw] px-5 pb-[8em] list-none">
      {data?.map(render)}
    </ul>
  );
}

export function PostsItem({ posts, type, likes }) {
  const currentUser = useCurrentUser();
  const { content, created_at, image, profiles } = posts;
  const { deletePost, isDeleting } = useDeletePost();
  const { addLike } = useLikePost();
  const [isOptions, setIsOprions] = useState(false);

  function handleAddLike() {
    addLike({ postId: posts.id, userId: currentUser });
  }

  return (
    <li
      className={`${
        posts.image ? "grid grid-rows-[1fr_auto_auto]" : ""
      } text-lime-100 font-NovaSquare space-y-5 bg-zinc-700/10 border-[0.5px] border-zinc-500/25 py-2 px-5 rounded-md w-[100%] shadow-md shadow-zinc-900 whitespace-pre-wrap overflow-scroll remove-scroll-edge`}
    >
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-md text-lime-100 text-md font-medium">
            {profiles.username}
          </h1>
          <span className="text-[0.70em] text-zinc-400">
            {Intl.DateTimeFormat("en", {
              timeStyle: "medium",
              dateStyle: "medium",
            }).format(new Date(created_at))}
          </span>
        </div>
        {type === "ownAccount" && (
          <div className="relative">
            <Button onClick={() => setIsOprions((current) => !current)}>
              <HiOutlineDotsHorizontal />
            </Button>
            {isOptions && (
              <Column className="absolute right-4 top-1">
                <Button
                  disabled={isDeleting}
                  onClick={() => deletePost(posts.id)}
                >
                  delete
                </Button>
                <Button>Edit</Button>
              </Column>
            )}
          </div>
        )}
      </div>

      {/* // * image  */}
      {posts.image && (
        <img
          src={image}
          alt=""
          className="w-auto h-[20em] aspect-auto rounded-lg"
        />
      )}
      <p className="text-sm py-5 w-[60%]">{content}</p>

      <Likes
        addLike={handleAddLike}
        liked={
          posts?.likes.filter((like) => like.user_id === currentUser).length
            ? true
            : false
        }
        length={posts.likes.length}
      />
    </li>
  );
}

export default Posts;
