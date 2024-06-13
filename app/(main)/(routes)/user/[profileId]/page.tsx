import UserProfileInfo from "@/components/user/user-profile-info";

export default function UserPage({
  params,
}: {
  params: { profileId: string };
}) {
  return (
    <div className="min-h-screen border-x">
      <UserProfileInfo profileId={params.profileId} />
    </div>
  );
}
