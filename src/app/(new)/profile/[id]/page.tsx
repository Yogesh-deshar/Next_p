import Profile from "../page";

const UserProfile = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("delay");
    }, 2000);
  });
  return (
    <div>
      <h2>{id}</h2>
      <Profile />
    </div>
  );
};

export default UserProfile;
