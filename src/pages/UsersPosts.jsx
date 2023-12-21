import Navigation from "../interface/Navigation";
import useAllposts from "../hooks/Users/useAllPosts";
import Spinner from "../interface/Spinner";
import Logo from "../interface/Logo";
import { PostsItem } from "../interface/Posts";
import ErrorWindow from "../interface/ErrorWindow";

function UsersPosts() {
  const { loadingPosts, allPosts, postsError } = useAllposts();
  if (postsError) return <ErrorWindow>{postsError}</ErrorWindow>;

  return (
    <>
      <Logo />
      {loadingPosts && <Spinner />}
      <ul className="list-none space-y-4">
        {allPosts?.map((post) => (
          <PostsItem key={post.id} posts={post} likes={allPosts.likes} />
        ))}
      </ul>
      <Navigation />
    </>
  );
}

export default UsersPosts;
