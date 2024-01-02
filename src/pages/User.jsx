import { useEffect, useState } from "react";
import { useUser } from "../hooks/Users/useUsersDetails";
import { useInsert } from "../hooks/Users/useInsertPost";
import { FaPowerOff } from "react-icons/fa";
import { useLogout } from "../hooks/Users/logout";
import { IoSettings } from "react-icons/io5";
import { HiOutlineBars4 } from "react-icons/hi2";
import Posts, { PostsItem } from "../interface/Posts";
import { useNavigate, useSearchParams } from "react-router-dom";
import ImageGallery from "../interface/ImageGallery";

import Spinner from "../interface/Spinner";
import Button from "../interface/Button";
import UserProfileUI from "../interface/UserProfileUI";
import Modal from "../interface/Modal";
import AreYouSureWindow from "../interface/AreYouSureWindow";
import Navigation from "../interface/Navigation";
import FormAddPost from "../interface/FormAddPost";
import Column from "../interface/Column";
import InfiniteScroll from "react-infinite-scroll-component";
import MiniSpinner from "../interface/MiniSpinner";

function User() {
  const navigate = useNavigate();
  const [isPosts, setIsPosts] = useState(true);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const { userLogout, isLoggingOut } = useLogout();
  const {
    loadingUsers,
    users,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useUser();
  const { addPosts, isLoadingAddPosts } = useInsert();
  const [searchParams, setSearcParams] = useSearchParams();

  const allPages =
    users?.pages?.reduce((acc, curr) => {
      return [...acc, ...curr.postsAndLikes];
    }, []) || [];

  useEffect(() => {
    if (users) {
      searchParams.set("name", `${users?.pages[0]?.currentUser?.full_name}`);
      setSearcParams(searchParams);
    }
  }, [users, setSearcParams, searchParams]);

  if (loadingUsers) return <Spinner />;

  return (
    <>
      {(isLoadingAddPosts || isLoggingOut) && <Spinner />}
      <HiOutlineBars4
        onClick={() => setSettingsOpen((current) => !current)}
        size={20}
        className={`fixed right-2 top-5  z-30 cursor-pointer s trasition-all duration-150 ${
          isSettingsOpen ? "rotate-90" : "rotate-0"
        }`}
      />
      {isSettingsOpen && (
        <Column className="fixed right-0 top-0 h-screen bg-transparent w-[200px] font-NovaSquare bg-zinc-700 transition-all duration-150 flex-col z-20">
          <Button
            className="flex gap-2 w-[100%] py-1"
            onClick={() => navigate("/settings")}
          >
            <IoSettings size={12} /> <span>settings</span>
          </Button>

          <Modal>
            <Modal.Open opens="openModal">
              <Button
                className="flex gap-2 w-[100%] py-1"
                onClick={() => setSettingsOpen(false)}
              >
                <FaPowerOff fill="white" size={10} />
                <span>logout</span>
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
        </Column>
      )}

      <UserProfileUI
        isPosts={isPosts}
        setIsPosts={setIsPosts}
        username={users?.pages[0]?.currentUser}
      />

      <FormAddPost addPosts={addPosts} isLoading={isLoadingAddPosts} />
      <InfiniteScroll
        dataLength={allPages ? allPages.length : 0}
        hasMore={hasNextPage}
        next={() => {
          fetchNextPage();
        }}
        // loader={<div>loading...</div>}
      />
      {isPosts ? (
        <Posts
          data={allPages}
          render={(post) => (
            <PostsItem key={post.id} posts={post} type="ownAccount" />
          )}
        />
      ) : (
        <ImageGallery data={users} />
      )}
      {isFetchingNextPage && <MiniSpinner width={10} height={10} />}
      <Navigation />
    </>
  );
}

export default User;
