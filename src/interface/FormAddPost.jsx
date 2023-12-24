import { useState } from "react";
import Button from "./Button";
import { IoAddOutline } from "react-icons/io5";

const inputStyle =
  "bg-transparent w-[100%] px-4 py-2 outline-none text-zinc-50 font-NovaSquare text-md";

function FormAddPost({ addPosts, isLoading }) {
  const [userPost, setUserPost] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [addForm, setAddForm] = useState(false);

  function handleAddForm(e) {
    e.preventDefault();
    if (!userPost && !imageFile) return;
    const formData = { userPost, imageFile };
    addPosts({ formData });
    setUserPost("");
    setAddForm(false);
  }

  return (
    <>
      <Button
        className="bg-zinc-600 rounded-[50%] w-[2.5em] h-[2.5em] flex justify-center items-center"
        onClick={() => setAddForm((current) => !current)}
      >
        <IoAddOutline size={20} fontWeight={800} color="silver" />
      </Button>
      <form
        action=""
        className={`${
          addForm ? "appear" : "disappear"
        } flex flex-col items-center gap-2 justify-center`}
        onSubmit={handleAddForm}
      >
        <textarea
          rows={2}
          cols={10}
          className={`${inputStyle}  border-b-lime-400 rounded-xl  border-b-[1px]`}
          type="text"
          placeholder="post...."
          value={userPost}
          onChange={(e) => setUserPost(e.target.value)}
        />
        <input
          className={inputStyle}
          type="file"
          accept="image/*"
          defaultValue=""
          onChange={(e) => setImageFile(e.target.files)}
          multiple
        />
        <Button disabled={isLoading} type="small">
          Add Post
        </Button>
      </form>
    </>
  );
}

export default FormAddPost;
