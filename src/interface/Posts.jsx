// import { FaRegCommentAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { BsAppIndicator } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
// import Spinner from "./Spinner";

import Likes from "./Likes";
import { useDeletePost } from "../hooks/Users/useDeletePosts";
import { useCurrentUser } from "../hooks/Users/useCurrentUser";
import { useLikePost } from "../hooks/Users/useLikePost";
import { useUnlikePost } from "../hooks/Users/UseUnlikePost";
import { useNavigate } from "react-router-dom";
import PostOptions from "./PostOptions";
import { formatTime } from "../utils/time";
import Content from "./Content";

function Posts({ data, render }) {
  return (
    <ul className="flex flex-col gap-4 md:w-[55vw] w-[90vw] px-5 pb-[8em] list-none items-center">
      {data?.map(render)}
    </ul>
  );
}

export function PostsItem({ posts, type }) {
  const [isLoadedImage, setIsLoadedImage] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const currentUser = useCurrentUser();
  const { content, created_at, profiles } = posts;
  const { deletePost, isDeleting } = useDeletePost();
  const { addLike, isLiking } = useLikePost();
  const { removeLike, isUnliking } = useUnlikePost();
  const navigate = useNavigate();

  useEffect(() => {
    function handleSwipe(e) {
      const touchStartX = e.changedTouches[0].clientX;
      let touchEndX;
      const onTouchEnd = (event) => {
        touchEndX = event.changedTouches[0].clientX;
        determineSwipeDirection();
        document.removeEventListener("touchend", onTouchEnd);
      };

      const determineSwipeDirection = () => {
        const deltaX = touchEndX - touchStartX;
        if (deltaX > 0) {
          // Swipe right
          if (currentImage > 0) {
            setCurrentImage((prevIndex) => prevIndex - 1);
          }
        } else if (deltaX < 0) {
          // Swipe left
          if (currentImage < posts?.image.length - 1) {
            setCurrentImage((prevIndex) => prevIndex + 1);
          }
        }
      };

      document.addEventListener("touchend", onTouchEnd);
    }

    posts?.image?.forEach(() => {
      document
        .querySelector(`.swipe-${posts.id}`)
        .addEventListener("touchstart", handleSwipe);
    });

    return () => {
      posts?.image?.forEach(() => {
        const element = document.querySelector(`.swipe-${posts.id}`);
        if (element) {
          element.removeEventListener("touchstart", handleSwipe);
        }
      });
    };
  }, [currentImage, posts]);

  function handleAddLike() {
    addLike({ postId: posts.id, userId: currentUser });
  }
  function handleRemoveLike() {
    removeLike({ id: posts.id, user_id: currentUser });
  }

  function handleNavigate(id) {
    navigate(`/comments/${id}`);
  }

  function handleLeftArrow() {
    if (currentImage === 0) {
      setCurrentImage(posts?.image?.length - 1);
    } else {
      setCurrentImage((cur) => cur - 1);
    }
  }
  function handleRightArrow() {
    if (currentImage === posts?.image?.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage((cur) => cur + 1);
    }
  }

  return (
    <li
      className={`${
        posts?.image.length ? "grid grid-rows-[1fr_auto_auto]" : null
      } list-none font-NovaSquare space-y-2 bg-zinc-900/30 border-[0.5px] border-zinc-500/25 py-2 px-5 rounded-md w-[350px] md:w-[600px] shadow-md shadow-zinc-800 whitespace-pre-wrap remove-scroll-edge`}
    >
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-sm text-lime-100 text-md font-medium">
            {profiles?.full_name}
          </h1>
          <span className="text-[0.6em] text-zinc-400">
            {formatTime(created_at)}
          </span>
        </div>

        {type === "ownAccount" && (
          <PostOptions
            deletePost={() => deletePost(posts.id)}
            deleting={isDeleting}
          />
        )}
      </div>

      {/* // * image  */}

      {posts?.image.length ? (
        <div className="relative w-[100%] h-auto flex justify-center flex-col items-center gap-3">
          <>
            {!isLoadedImage && <div className="image-loader"></div>}
            <img
              src={posts?.image[currentImage]}
              key={Math.random() * 1000}
              alt=""
              className={`w-[300px] h-[350px] md:w-auto md:h-autorounded-lg slowAndSteady object-cover swipe-${
                posts.id
              } float-left ${
                isLoadedImage ? "backdrop-blur-0" : "backdrop-blur-xl"
              }`}
              onLoad={() => {
                setIsLoadedImage(true);
              }}
            />

            {/* { image dots for navigation} */}
            <div className="flex space-center slowAndSteady items-center h-5">
              {posts?.image.map((_, i) => (
                <span key={i}>
                  {posts.image.length > 1 && (
                    <>
                      <GoDotFill
                        fill="white"
                        key={Math.random() * 1000}
                        size={currentImage === i ? 12 : 10}
                        onClick={() => setCurrentImage(i)}
                        className={`${
                          currentImage === i ? "opacity-100" : "opacity-50"
                        } cursor-pointer`}
                      />
                    </>
                  )}
                </span>
              ))}
            </div>

            {/* {arrows for navigation } */}

            {posts?.image?.length > 1 && (
              <>
                <FaArrowLeft
                  onClick={handleLeftArrow}
                  className="absolute left-3 bg-white w-6 h-6 rounded-[100%] p-[4px]"
                  fill="black"
                  cursor="pointer"
                />
                <FaArrowRight
                  onClick={handleRightArrow}
                  className="absolute right-3 bg-white w-6 h-6 rounded-[100%] p-[4px]"
                  fill="black"
                  cursor="pointer"
                />
              </>
            )}
          </>
        </div>
      ) : null}

      {/* {Post content} */}
      <div className="text-sm py-5 w-[60%]">
        <Content>{content}</Content>
      </div>

      <div className="w-[60%] md:w-[50%] flex justify-between border-b-[1px] border-b-zinc-100/20 p-2 items-start">
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
        <span className="relative">
          <span className="absolute text-lime-400 font-bold text-sm top-[-50%] right-1 z-10">
            {posts.comment}
          </span>
          <BsAppIndicator
            onClick={() => {
              handleNavigate(posts.id);
            }}
            size={20}
            className="cursor-pointer w-[12px] md:w-[17px]"
          />
        </span>
      </div>
    </li>
  );
}

export default Posts;
