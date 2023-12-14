import Form from "../interface/Form";

function UserInformation() {
  // useEffect(() => {
  //   async function retrieveUser() {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();
  //     console.log(user);
  //   }
  //   retrieveUser();
  // }, []);

  return (
    <>
      <Form type="userDetails" buttonLabel="Submit" formFor="userDetails" />
    </>
  );
}

export default UserInformation;
