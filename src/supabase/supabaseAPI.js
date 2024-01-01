import supabase, { supabaseUrl } from "./supabase";
import { PAGE_SIZE } from "../utils/consts";

//* Function to match like and post
async function matchLikeandPost(post) {
  const postID = post?.map((ids) => ids.id);

  const { data: likes } = await supabase
    .from("likes")
    .select("*")
    .in("post_id", postID);

  const { data: comments } = await supabase.from("comments").select("post_id");

  const foreignUserDetails = post.map((post) => {
    const postLikes = likes.filter((like) => like.post_id === post.id);
    const comment = comments.filter((com) => com.post_id === post.id);
    return { ...post, likes: postLikes, comment: comment.length };
  });

  return foreignUserDetails;
}

//* Get current user
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data: user, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return user?.user;
}

//* sign Up
export async function signUp({ email, password, full_name, avatar_url }) {
  const { data: user, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name, avatar_url: avatar_url || "" },
      emailRedirectTo: "https://localhost:5173/login",
    },
  });

  if (error) {
    throw new Error(error.message);
  }
  return user.user;
}

//* update user
export async function updateUser({ full_name, avatar_url, id }) {
  const fileName = avatar_url.name;
  const fileUrl = avatar_url
    ? `${supabaseUrl}/storage/v1/object/public/avatars/${avatar_url.name}`.replaceAll(
        "-",
        "_"
      )
    : "";

  const { error } = await supabase.auth.updateUser({
    data: {
      full_name: full_name,
      avatar_url: fileUrl,
    },
  });

  await supabase.from("profiles").update({ full_name }).eq("id", id);
  if (!avatar_url) return;

  const { error: uploaderror } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar_url);

  if (error || uploaderror)
    throw new Error(error.message || uploaderror.message);
}

//*Login
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) return new Error(error.message);
  return data;
}

// //* SIGN UP WITH EMAIL AND PASSWORD
// export async function SignUpWithEmailandPass(email, password) {
//   let { data, error } = await supabase.auth.signUp({
//     email: email,
//     password: password,
//   });
//   if (error) throw new Error(error.message);
//   return data;
// }

//* INSERT POSTS
export async function insertPosts(post) {
  let fileName = [];
  let imagePath = [];
  const imageArray = post?.formData.imageFile;
  for (let i = 0; i < imageArray?.length; i++) {
    fileName.push(imageArray[i].name.replaceAll("-", "_"));
    imagePath.push(
      imageArray[i]
        ? `${supabaseUrl}/storage/v1/object/public/userPhotos/${imageArray[i].name}`
        : null
    );
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data, error } = await supabase
    .from("posts")
    .insert({
      content: post.formData.userPost,
      user_id: user.id,
      image: [...imagePath],
    })
    .single();

  if (error) throw new Error(error.message);
  if (post?.formData?.imageFile === "") return data;

  for (let j = 0; j < imageArray.length; j++) {
    const { error } = await supabase.storage
      .from("userPhotos")
      .upload(imageArray[j].name, imageArray[j]);

    if (error) {
      throw new Error(error.message);
    }
  }

  return data;
}

//* LOAD USER DETAILS
export async function loadUserDetails({ pageParam = 0 }) {
  const start = pageParam * PAGE_SIZE;
  const end = start + PAGE_SIZE - 1;

  const {
    data: { user: userInfo },
  } = await supabase.auth.getUser();

  if (!userInfo) return;

  let {
    data: posts,
    error,
    count,
  } = await supabase
    .from("posts")
    .select("*, profiles(username, avatar_url)", { count: "exact" })
    .eq("user_id", userInfo.id)
    .range(start, end);

  const postsAndLikes = await matchLikeandPost(posts);

  let { data: currentUser } = await supabase
    .from("profiles")
    .select()
    .eq("id", userInfo.id)
    .single();
  if (error) throw new Error(error.message);
  return { postsAndLikes, currentUser, count, pageOffset: pageParam };
}

//* DELETE POSTS
export async function deletePosts(id) {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
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
  } = await supabase
    .from("posts")
    .select("*, profiles(username)", { count: "exact" })
    .neq("user_id", activeUserId)
    .range(start, end);

  const postsAndLikes = await matchLikeandPost(posts);
  if (error) throw new Error(error.message);
  return { postsAndLikes, pageoffset: pageParam, count };
}

//* LIKE POST
export async function likePost(postId, userId) {
  const { data: likes, error } = await supabase
    .from("likes")
    .insert({ post_id: postId, user_id: userId })
    .select();
  if (error) console.log(error);
  return likes;
}

//* UNLIKE POST
export async function unlikePost(id, user_id) {
  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("post_id", id)
    .eq("user_id", user_id);
  if (error) console.error(error.message);
}

//*UPDATE PROFILE PICTURE
// export async function updateAvatar(newImage, id) {
//   console.log(id, newImage);
//   const image = newImage.name.replaceAll("-", "_");
//   const imagePath = `${supabaseUrl}/storage/v1/object/public/avatars/${image}`;

//   const { data, error } = await supabase
//     .from("profiles")
//     .update({ avatar_url: imagePath })
//     .eq("id", id)
//     .single();
//   console.log(data);
//   if (error) return;

//   const { data: photo, error: uploadError } = await supabase.storage
//     .from("avatars")
//     .upload(image, newImage, {
//       cacheControl: "3600",
//       upsert: false,
//     });
//   console.log(photo, uploadError, data);
//   return data;
// }

//*FETCHfOREIGH USER
export async function foreignUser(user_id) {
  const { data: post, error } = await supabase
    .from("posts")
    .select("*, profiles(username)")
    .eq("user_id", user_id);

  const foreignUserDetails = await matchLikeandPost(post);
  if (error) throw new Error(error.message);

  return foreignUserDetails;
}

//* Comments
export async function getComments(postId) {
  const { data: comments, error } = await supabase
    .from("comments")
    .select("*, profiles(username)")
    .eq("post_id", postId);

  if (error) console.error(error.message);
  return comments;
}

//* change username

// export async function changeUsername(newName, user_id) {
//   console.log(newName, user_id);
//   const { error } = await supabase
//     .from("profiles")
//     .update({ username: newName })
//     .eq("id", user_id)
//     .select();

//   if (error) throw new Error(error.message);
// }

//* ADD COMMENT
export async function addComment(content, postid, userid) {
  const { data, error } = await supabase
    .from("comments")
    .insert({ comments: content, post_id: postid, user_id: userid })
    .select();

  if (error) throw new Error(error.message);
  return data;
}

//* Log out

export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
