import { redirect } from "react-router-dom";
import supabase, { supabaseUrl } from "./supabase";

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

  // let { data: likes } = await supabase.from("likes").sle;

  if (error) throw new Error(error.message);
  return { posts };
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
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*, profiles(username)")
    .range(start, end);
  if (error) throw new Error(error.message);
  return posts;
}
