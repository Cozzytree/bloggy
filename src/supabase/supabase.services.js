import { PAGE_SIZE } from "../utils/consts";
import Supabase from "./supabase";
import { client } from "./supabase";

class Services extends Supabase {
  constructor() {
    super();
  }
  async getAllPosts({ pageParam = 0 }) {
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
      .select("*, profiles(username)", { count: "exact" })
      .neq("user_id", activeUserId)
      .range(start, end);

    const postsAndLikes = await this.matchLikeandPost(posts);
    if (error) throw new Error(error.message);
    return { postsAndLikes, pageoffset: pageParam, count };
  }

  async loadUserDetails({ pageParam = 0 }) {
    const start = pageParam * PAGE_SIZE;
    const end = start + PAGE_SIZE - 1;
    const {
      data: { user: userInfo },
    } = await client.auth.getUser();

    if (!userInfo) return;

    let {
      data: posts,
      error,
      count,
    } = await client
      .from("posts")
      .select("*, profiles(username, avatar_url)", { count: "exact" })
      .eq("user_id", userInfo.id)
      .range(start, end);

    const postsAndLikes = await this.matchLikeandPost(posts);

    let { data: currentUser } = await client
      .from("profiles")
      .select()
      .eq("id", userInfo.id)
      .single();
    if (error) throw new Error(error.message);
    console.log(postsAndLikes);
    return { postsAndLikes, currentUser, count, pageOffset: pageParam };
  }

  async deletePosts(id) {
    const { error } = await client.from("posts").delete().eq("id", id);
    if (error) throw new Error(error.message);
  }

  async likePost(postId, userId) {
    const { data: likes, error } = await client
      .from("likes")
      .insert({ post_id: postId, user_id: userId })
      .select();
    if (error) console.log(error);
    return likes;
  }

  async unlikePost(id, user_id) {
    const { error } = await client
      .from("likes")
      .delete()
      .eq("post_id", id)
      .eq("user_id", user_id);
    if (error) console.error(error.message);
  }

  async getComments(postId) {
    const { data: comments, error } = await client
      .from("comments")
      .select("*, profiles(username)")
      .eq("post_id", postId);

    if (error) console.error(error.message);
    return comments;
  }

  async addComment(content, postid, userid) {
    const { data, error } = await client
      .from("comments")
      .insert({ comments: content, post_id: postid, user_id: userid })
      .select();

    if (error) throw new Error(error.message);
    return data;
  }

  async insertPost(post) {
    let fileName = [];
    let imagePath = [];
    const imageArray = post?.formData.imageFile;
    for (let i = 0; i < imageArray?.length; i++) {
      fileName.push(imageArray[i].name.replaceAll("-", "_"));
      imagePath.push(
        imageArray[i]
          ? `${this.supabaseUrl}/storage/v1/object/public/userPhotos/${imageArray[i].name}`
          : null
      );
    }
    const {
      data: { user },
    } = await client.auth.getUser();

    if (!user) return;

    const { data, error } = await client
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
      const { error } = await client.storage
        .from("userPhotos")
        .upload(imageArray[j].name, imageArray[j]);

      if (error) {
        throw new Error(error.message);
      }
    }

    return data;
  }

  async searchUser(username) {
    try {
      const { data, error } = await client
        .from("profiles")
        .select()
        .textSearch("full_name", username);

      if (error) throw new Error(error.message);
      if (!data.length) throw new Error("no records");
      return data;
    } catch (error) {
      throw error.message;
    }
  }
}

const services = new Services();
export default services;
