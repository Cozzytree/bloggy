import Supabase from "./supabase";
import { client } from "./supabase";

class AuthService extends Supabase {
  constructor() {
    super();
  }

  async signUp({ email, password, full_name, avatar_url }) {
    try {
      const { data: user, error } = await client.auth.signUp({
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
    } catch (error) {
      throw error.message;
    }
  }

  async login({ email, password }) {
    try {
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return new Error(error.message);
      return data;
    } catch (error) {
      throw error.message;
    }
  }

  async loginWithEmail(email) {
    try {
      const { data, error } = await client.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: "https://blogggyy.netlify.app/user",
        },
      });
      if (error) throw new Error(error.message);
      return data;
    } catch (error) {
      throw error.message;
    }
  }

  async getCurrentUser() {
    const { data: session } = await client.auth.getSession();
    if (!session.session) return null;

    const { data: user, error } = await client.auth.getUser();
    if (error) throw new Error(error.message);

    return user?.user;
  }

  async logout() {
    const { error } = await client.auth.signOut();
    if (error) throw new Error(error.message);
  }

  async updateUser({ full_name, avatar_url, id }) {
    const fileName = avatar_url.name;
    const fileUrl = avatar_url
      ? `${this.supabaseUrl}/storage/v1/object/public/avatars/${avatar_url.name}`.replaceAll(
          "-",
          "_"
        )
      : "";

    const { error } = await client.auth.updateUser({
      data: {
        full_name: full_name,
        avatar_url: fileUrl,
      },
    });

    await client.from("profiles").update({ full_name }).eq("id", id);
    if (!avatar_url) return;

    const { error: uploaderror } = await client.storage
      .from("avatars")
      .upload(fileName, avatar_url);

    if (error || uploaderror)
      throw new Error(error.message || uploaderror.message);
  }

  async changePassword(password) {
    try {
      const { error } = await client.auth.updateUser({
        password: password,
      });
      if (error) {
        throw new Error(error.message);
      }
    } catch (err) {
      throw err.message;
    }
  }

  async sendNewPassword(email) {
    let { data, error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset_password",
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}

const authService = new AuthService();

export default authService;
