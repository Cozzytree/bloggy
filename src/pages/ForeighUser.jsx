import { useForeighUser } from "../hooks/Users/useForeighUser";
import BackButton from "../interface/BackButton";
import Navigation from "../interface/Navigation";
import { PostsItem } from "../interface/Posts";
import Spinner from "../interface/Spinner";
import { useCurrentUser } from "../hooks/Users/useCurrentUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ForeighUser() {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const { foreignUserData, loadingForeign } = useForeighUser();

  useEffect(() => {
    if (
      currentUser === (foreignUserData?.length && foreignUserData[0]?.user_id)
    )
      navigate("/user");
  }, [currentUser, foreignUserData, navigate]);

  if (loadingForeign) return <Spinner />;

  return (
    <>
      <BackButton className="absolute left-4 top-4 text-xs md:text-sm" />
      {foreignUserData?.map((posts) => (
        <PostsItem posts={posts} key={posts.id} />
      ))}

      <Navigation />
    </>
  );
}

export default ForeighUser;
