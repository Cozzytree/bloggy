import { useEffect, useState } from "react";
import { useUser } from "../hooks/Users/useUsersDetails";
import { useInsert } from "../hooks/Users/useInsertPost";
import { QueryCache } from "@tanstack/react-query";
import { FaPowerOff } from "react-icons/fa";
import { useLogout } from "../hooks/Users/logout";
import Posts, { PostsItem } from "../interface/Posts";
import { useSearchParams } from "react-router-dom";
import ImageGallery from "../interface/ImageGallery";

import Spinner from "../interface/Spinner";
import Button from "../interface/Button";
import UserProfileUI from "../interface/UserProfileUI";
// import { useDeletePost } from "../hooks/Users/useDeletePosts";
import Modal from "../interface/Modal";
import AreYouSureWindow from "../interface/AreYouSureWindow";
import Navigation from "../interface/Navigation";
import FormAddPost from "../interface/FormAddPost";

function User() {
  const queryCache = new QueryCache();
  const [isPosts, setIsPosts] = useState(true);
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

  if (loadingUsers) return <Spinner />;

  return (
    <>
      {isLoadingAddPosts && <Spinner />}
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

      <FormAddPost addPosts={addPosts} isLoading={isLoadingAddPosts} />

      {isPosts ? (
        <Posts
          data={users}
          render={(post) => (
            <PostsItem key={post.id} posts={post} type="ownAccount" />
          )}
        />
      ) : (
        <ImageGallery data={users} />
      )}
      <Navigation />
    </>
  );
}

export default User;
