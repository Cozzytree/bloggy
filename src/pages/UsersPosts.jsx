import Navigation from "../interface/Navigation";
import useAllposts from "../hooks/Users/useAllPosts";
import Spinner from "../interface/Spinner";
import Logo from "../interface/Logo";
import { PostsItem } from "../interface/Posts";

function UsersPosts() {
  const { loadingPosts, allPosts, postsError } = useAllposts();

  return (
    <>
      <Logo />
      {loadingPosts && <Spinner />}
      <ul className="list-none space-y-4">
        {allPosts?.map((post) => (
          <PostsItem key={post.id} posts={post} />
        ))}
      </ul>
      <Navigation />
    </>
  );
}

export default UsersPosts;
