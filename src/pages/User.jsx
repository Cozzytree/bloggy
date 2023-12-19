import { useEffect, useState } from "react";
import { useUser } from "../hooks/Users/useUsersDetails";
import { useInsert } from "../hooks/Users/useInsertPost";
import { IoAddOutline } from "react-icons/io5";
import { QueryCache } from "@tanstack/react-query";
import { FaPowerOff } from "react-icons/fa";
import { useLogout } from "../hooks/Users/logout";
import Posts, { PostsItem } from "../interface/Posts";
import ImageGallery, { ImageItem } from "../interface/ImageGallery";
import { useNavigate, useSearchParams } from "react-router-dom";

import Spinner from "../interface/Spinner";
import Button from "../interface/Button";
import UserProfileUI from "../interface/UserProfileUI";
// import { useDeletePost } from "../hooks/Users/useDeletePosts";
import Modal from "../interface/Modal";
import AreYouSureWindow from "../interface/AreYouSureWindow";
import Navigation from "../interface/Navigation";
const queryCache = new QueryCache();

const inputStyle =
  "bg-transparent w-[100%] px-4 py-2 outline-none text-zinc-50 font-NovaSquare text-md";

function User() {
  const navigate = useNavigate();
  const [userPost, setUserPost] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [isPosts, setIsPosts] = useState(true);
  const [addForm, setAddForm] = useState(false);
  const { userLogout } = useLogout();
  const { loadingUsers, users } = useUser();
  const { addPosts, isLoadingAddPosts } = useInsert();
  const [searchParams, setSearcParams] = useSearchParams();

  useEffect(() => {
    if (users) {
      searchParams.set("", users?.[0]?.profiles.username);
      setSearcParams(searchParams);
    }
  }, [users, setSearcParams, searchParams]);

  useEffect(
    function () {
      const data = JSON.parse(
        localStorage.getItem("sb-vozbqbvaultodqeuimqv-auth-token")
      );
      if (data) return;
      if (users && !data) {
        navigate("/login");
        queryCache.clear();
      }
    },
    [navigate, users]
  );

  function handleAddForm(e) {
    e.preventDefault();
    if (!userPost && !imageFile) return;

    // console.log({ userPost, imageFile });
    const formData = { userPost, imageFile };
    addPosts({ formData });
    setUserPost("");
    setAddForm(false);
  }

  if (loadingUsers) return <Spinner />;

  return (
    <>
      {/* {"modal for log out"} */}
      <Modal>
        <Modal.Open opens="openModal">
          <Button className="absolute top-4 right-4">
            <FaPowerOff fill="white" />
          </Button>
        </Modal.Open>

        <Modal.ModalWindow name="openModal">
          <AreYouSureWindow label="Are you sure tou want to logout?">
            <Button onClick={userLogout} type="danger">
              Log out
            </Button>
          </AreYouSureWindow>
        </Modal.ModalWindow>
      </Modal>

      <UserProfileUI
        isPosts={isPosts}
        setIsPosts={setIsPosts}
        username={users?.[0]}
      />

      <Button
        className="bg-zinc-600 rounded-[50%] w-[4em] h-[4em] flex justify-center items-center"
        onClick={() => setAddForm((current) => !current)}
      >
        <IoAddOutline size={50} />
      </Button>

      {isLoadingAddPosts && <Spinner />}

      {/* {"Form for adding posts"} */}
      <form
        action=""
        className={`${
          addForm ? "appear" : "disappear"
        } flex flex-col items-center gap-2 justify-center`}
        onSubmit={handleAddForm}
      >
        <textarea
          rows={2}
          cols={10}
          className={`${inputStyle}  border-b-lime-400 rounded-xl  border-b-[1px]`}
          type="text"
          placeholder="post...."
          value={userPost}
          onChange={(e) => setUserPost(e.target.value)}
        />
        <input
          className={inputStyle}
          type="file"
          accept="image/*"
          defaultValue=""
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <Button disabled={isLoadingAddPosts} type="small">
          Add Post
        </Button>
      </form>

      {isPosts ? (
        <Posts
          data={users}
          render={(post) => (
            <PostsItem key={post.id} posts={post} type="ownAccount" />
          )}
        />
      ) : (
        <ImageGallery
          data={users}
          render={(image) =>
            image.image ? <ImageItem key={image.id} data={image} /> : null
          }
        />
      )}
      <Navigation />
    </>
  );
}

export default User;
