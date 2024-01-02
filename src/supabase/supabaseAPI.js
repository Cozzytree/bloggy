import { client } from "./supabase";
import { PAGE_SIZE } from "../utils/consts";

//* Function to match like and post
async function matchLikeandPost(post) {
  const postID = post?.map((ids) => ids.id);

  const { data: likes } = await client
    .from("likes")
    .select("*")
    .in("post_id", postID);

  const { data: comments } = await client.from("comments").select("post_id");

  const foreignUserDetails = post.map((post) => {
    const postLikes = likes.filter((like) => like.post_id === post.id);
    const comment = comments.filter((com) => com.post_id === post.id);
    return { ...post, likes: postLikes, comment: comment.length };
  });

  return foreignUserDetails;
}

//* ..........LOAD USER DETAILS .........
export async function loadUserDetails({ pageParam = 0 }) {
  const start = pageParam * PAGE_SIZE;
  const end = start + PAGE_SIZE - 1;

  const {
    data: { user: userInfo },
  } = await client.auth.getUser();

  if (!userInfo) return null;

  let {
    data: posts,
    error,
    count,
  } = await client
    .from("posts")
    .select("*, profiles(full_name, avatar_url)", { count: "exact" })
    .eq("user_id", userInfo.id)
    .range(start, end);

  const postsAndLikes = await matchLikeandPost(posts);

  let { data: currentUser } = await client
    .from("profiles")
    .select()
    .eq("id", userInfo.id)
    .single();
  if (error) throw new Error(error.message);
  return { postsAndLikes, currentUser, count, pageOffset: pageParam };
}

//* GET ALL POSTS
export async function getAllPosts({ pageParam = 0 }) {
  const start = pageParam * PAGE_SIZE;
  const end = start + PAGE_SIZE - 1;
  const activeUser = JSON.parse(
    localStorage.getItem("sb-vozbqbvaultodqeuimqv-auth-token")
  );
  const activeUserId = activeUser.user.id;
  const {
    data: posts,
    error,
    count,
  } = await client
    .from("posts")
    .select("*, profiles(full_name)", { count: "exact" })
    .neq("user_id", activeUserId)
    .range(start, end);

  const postsAndLikes = await matchLikeandPost(posts);
  if (error) throw new Error(error.message);
  return { postsAndLikes, pageoffset: pageParam, count };
}

//*FETCH fOREIGH USER
export async function foreignUser(user_id) {
  const { data: post, error } = await client
    .from("posts")
    .select("*, profiles(username)")
    .eq("user_id", user_id);

  const foreignUserDetails = await matchLikeandPost(post);
  if (error) throw new Error(error.message);

  return foreignUserDetails;
}
