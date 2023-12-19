import { useForeighUser } from "../hooks/Users/useForeighUser";
import BackButton from "../interface/BackButton";
import Navigation from "../interface/Navigation";
import { PostsItem } from "../interface/Posts";
import Spinner from "../interface/Spinner";

function ForeighUser() {
  const { foreignUserData, loadingForeign } = useForeighUser();

  if (loadingForeign) return <Spinner />;

  return (
    <>
      <BackButton className="absolute left-4 top-4" />
      {foreignUserData.map((posts) => (
        <PostsItem posts={posts} key={posts.id} />
      ))}

      <Navigation />
    </>
  );
}

export default ForeighUser;
