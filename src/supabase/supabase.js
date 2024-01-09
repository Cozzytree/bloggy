import { createClient } from "@supabase/supabase-js";
export const supabaseKey = import.meta.env.VITE_SUPABASEKEY;
export const supabaseUrl = import.meta.env.VITE_SUPABASEURL;

export const client = createClient(
  import.meta.env.VITE_SUPABASEURL,
  import.meta.env.VITE_SUPABASEKEY
);

class Supabase {
  async matchLikeandPost(post) {
    const postID = post?.map((ids) => ids.id);

    const { data: likes } = await this.client
      .from("likes")
      .select("*")
      .in("post_id", postID);

    const { data: comments } = await this.client
      .from("comments")
      .select("post_id");

    const foreignUserDetails = post.map((post) => {
      const postLikes = likes.filter((like) => like.post_id === post.id);
      const comment = comments.filter((com) => com.post_id === post.id);
      return { ...post, likes: postLikes, comment: comment.length };
    });

    return foreignUserDetails;
  }
}

export default Supabase;
