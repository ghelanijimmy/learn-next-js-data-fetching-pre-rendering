import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";

type UserProps = {
  username: string;
  email: string;
};
export default function UserProfilePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <>
      <h1>{props.username}</h1>
      <p>{props.email}</p>
    </>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<UserProps>> {
  return {
    props: {
      username: "Jimmy",
      email: "",
    },
  };
}
