import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaRegCommentAlt } from "react-icons/fa";

import { useRef, useState } from "react";
import Button from "./Button";
import Column from "./Column";
// import Spinner from "./Spinner";
import Modal from "./Modal";
import Likes from "./Likes";
import AreYouSureWindow from "./AreYouSureWindow";
import { useDeletePost } from "../hooks/Users/useDeletePosts";
import { useCurrentUser } from "../hooks/Users/useCurrentUser";
import { useLikePost } from "../hooks/Users/useLikePost";
import { useUnlikePost } from "../hooks/Users/UseUnlikePost";
import { useClickOutside } from "../hooks/uiHooks/useClickOutside";
import { useNavigate } from "react-router-dom";

function Posts({ data, render }) {
  return (
    <ul className="flex flex-col gap-4 md:w-[55vw] w-[90vw] px-5 pb-[8em] list-none">
      {data?.map(render)}
    </ul>
  );
}

export function PostsItem({ posts, type }) {
  const [isOptions, setIsOptions] = useState(false);
  const [isLoadedImage, setIsLoadedImage] = useState(false);
  const currentUser = useCurrentUser();
  const { content, created_at, image, profiles } = posts;
  const { deletePost, isDeleting } = useDeletePost();
  const { addLike, isLiking } = useLikePost();
  const { removeLike, isUnliking } = useUnlikePost();
  const navigate = useNavigate();
  const ref = useRef();

  function handleAddLike() {
    addLike({ postId: posts.id, userId: currentUser });
  }
  function handleRemoveLike() {
    removeLike({ id: posts.id, user_id: currentUser });
  }

  function handleLoadedImage() {
    setIsLoadedImage(true);
  }

  function handleNavigate(id) {
    navigate(`/comments/${id}`);
  }

  useClickOutside(ref, () => setIsOptions(false));

  return (
    <li
      className={`${
        posts.image ? "grid grid-rows-[1fr_auto_auto]" : ""
      } list-none text-lime-100 font-NovaSquare space-y-5 bg-zinc-700/10 border-[0.5px] border-zinc-500/25 py-2 px-5 rounded-md w-[100%] shadow-md shadow-zinc-900 whitespace-pre-wrap overflow-scroll remove-scroll-edge`}
    >
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-md text-lime-100 text-md font-medium">
            {profiles?.username}
          </h1>
          <span className="text-[0.70em] text-zinc-400">
            {Intl.DateTimeFormat("en", {
              timeStyle: "medium",
              dateStyle: "medium",
            }).format(new Date(created_at))}
          </span>
        </div>
        {type === "ownAccount" && (
          <div className="relative" ref={ref}>
            <Button onClick={() => setIsOptions((current) => !current)}>
              <HiOutlineDotsHorizontal />
            </Button>
            {isOptions && (
              <Column className="absolute right-4 top-1">
                <Modal>
                  <Modal.Open opens="openModal">
                    <Button>Delete</Button>
                  </Modal.Open>
                  <Modal.ModalWindow name="openModal">
                    <AreYouSureWindow label="Are you sure you want to delete the post?">
                      <Button
                        type="danger"
                        disabled={isDeleting}
                        onClick={() => deletePost(posts.id)}
                      >
                        delete
                      </Button>
                    </AreYouSureWindow>
                  </Modal.ModalWindow>
                </Modal>

                <Button>Edit</Button>
              </Column>
            )}
          </div>
        )}
      </div>

      {/* // * image  */}
      {posts.image && (
        <div className="min-w-[30em] relative min-h-[20em]">
          {!isLoadedImage && <div className="image-loader h-[20em]"></div>}
          <img
            src={image}
            alt=""
            className="w-auto h-[20em] aspect-auto rounded-lg"
            onLoad={() => handleLoadedImage()}
          />
        </div>
      )}
      <p className="text-sm py-5 w-[60%]">{content}</p>

      <div className="w-[50%] flex justify-between border-b-[1px] border-b-zinc-100/20 p-2">
        <Likes
          isProcessing={{ isLiking, isUnliking }}
          removeLike={() => handleRemoveLike()}
          addLike={handleAddLike}
          liked={
            posts?.likes.filter((like) => like.user_id === currentUser).length
              ? true
              : false
          }
          length={posts.likes.length}
        />

        <FaRegCommentAlt
          onClick={() => {
            handleNavigate(posts.id);
          }}
          size={15}
          className="cursor-pointer"
        />
      </div>
    </li>
  );
}

export default Posts;
