import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";

export default function UserIdPage({
  email,
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <h1>{id}</h1>
      <p>{email}</p>
    </>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ id: string; email: string }>> {
  const { params } = context;

  const userId = params!.uid;

  return {
    props: {
      id: `user-id-${userId}`,
      email: "test@test.com",
    },
  };
}
