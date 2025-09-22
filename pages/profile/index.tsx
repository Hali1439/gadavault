import AvatarMenu from "@/components/users/AvatarMenu"
export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="flex flex-col gap-6">
        <div className="p-6 rounded-lg bg-white shadow">
          <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
          <p className="text-gray-600">
            Manage your email, password, and other account details here.
          </p>
        </div>

        <div className="p-6 rounded-lg bg-white shadow">
          <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
          <AvatarMenu />
        </div>
      </div>
    </div>
  );
}
