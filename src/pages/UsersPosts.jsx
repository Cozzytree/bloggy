import Navigation from "../interface/Navigation";
import useAllposts from "../hooks/Users/useAllPosts";
import Spinner from "../interface/Spinner";
import Logo from "../interface/Logo";
import { PostsItem } from "../interface/Posts";
import ErrorWindow from "../interface/ErrorWindow";
import InfiniteScroll from "react-infinite-scroll-component";

function UsersPosts() {
  const { loadingPosts, pages, postsError, fetchNextPage, hasNextPage } =
    useAllposts();

  const allPages =
    pages?.pages?.reduce((acc, curr) => {
      return [...acc, ...curr.postsAndLikes];
    }, []) || [];
  if (postsError) return <ErrorWindow>{postsError}</ErrorWindow>;
  return (
    <>
      <Logo />
      <InfiniteScroll
        dataLength={allPages ? allPages.length : 0}
        hasMore={hasNextPage}
        next={() => {
          fetchNextPage();
        }}
        loader={loadingPosts}
      />
      {loadingPosts && <Spinner />}
      <ul className="list-none space-y-4">
        {allPages.map((post) => (
          <PostsItem key={post.id} posts={post} likes={post.likes} />
        ))}
      </ul>

      <Navigation />
    </>
  );
}

export default UsersPosts;
