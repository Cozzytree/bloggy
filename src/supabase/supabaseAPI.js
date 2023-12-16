import { redirect } from "react-router-dom";
import supabase, { supabaseUrl } from "./supabase";
import { data } from "autoprefixer";

//* SIGN UP WITH EMAIL AND PASSWORD
export async function SignUpWithEmailandPass(email, password) {
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) throw new Error(error.message);
  return data;
}

//* INSERT POSTS
export async function insertPosts(post) {
  console.log(post);
  const image = post.formData.imageFile.name;
  const imagePath = image
    ? `${supabaseUrl}/storage/v1/object/public/usersPhotos/${image}`
    : null;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data, error } = await supabase
    .from("posts")
    .insert({
      content: post.formData.userPost,
      user_id: user.id,
      image: imagePath,
    })
    .single();

  if (post.formData.imageFile === "") return data;

  const { error: storageError } = await supabase.storage
    .from("usersPhotos")
    .upload(image, post.formData.imageFile, {
      cacheControl: 3600,
      upsert: true,
    });

  if (storageError) await supabase.from("posts").delete().eq("id", data.id);

  if (data) console.log("data", data);
  if (error) console.error(error);
  return data;
}

//* LOAD USER DETAILS
export async function loadUserDetails() {
  const {
    data: { user: userInfo },
  } = await supabase.auth.getUser();

  if (!userInfo) redirect("/login");

  // let { data } = await supabase
  //   .from("profiles")
  //   .select("*")
  //   .eq("id", userInfo.id);

  let { data: posts, error } = await supabase
    .from("posts")
    .select("*, profiles(username)")
    .eq("user_id", userInfo.id);

  const postIDs = posts.map((id) => id.id);

  const { data: likes } = await supabase
    .from("likes")
    .select("*")
    .in("post_id", postIDs);

  const postsAndLikes = posts.map((post) => {
    const postLikes = likes.filter((like) => like.post_id === post.id);
    return { ...post, likes: postLikes };
  });

  if (error) throw new Error(error.message);
  return postsAndLikes;
}

//* DELETE POSTS
export async function deletePosts(id) {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

//* GET ALL POSTS
export async function getAllPosts({ pageParam = 0 }) {
  const start = pageParam * 10;
  const end = pageParam * 10 + 10;
  const activeUser = JSON.parse(
    localStorage.getItem("sb-vozbqbvaultodqeuimqv-auth-token")
  );
  const activeUserId = activeUser.user.id;
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*, profiles(username)")
    .neq("user_id", activeUserId)
    .range(start, end);

  const postIDs = posts.map((id) => id.id);

  const { data: likes } = await supabase
    .from("likes")
    .select("*")
    .in("post_id", postIDs);

  const postsAndLikes = posts.map((post) => {
    const postLikes = likes.filter((like) => like.post_id === post.id);
    return { ...post, likes: postLikes };
  });

  if (error) throw new Error(error.message);
  return postsAndLikes;
}

//* LIKE POST
export async function likePost(postId, userId) {
  console.log(postId, userId);
  const { data: likes, error } = await supabase
    .from("likes")
    .insert({ post_id: postId, user_id: userId })
    .select();
  if (error) console.log(error);
  return likes;
}
