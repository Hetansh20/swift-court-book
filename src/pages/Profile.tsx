import { SEO } from "@/components/SEO";
import Header from "@/components/layout/Header";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  return (
    <>
      <SEO title="Profile — QuickCourt" description="Manage your QuickCourt profile." canonical="/profile" />
      <Header />
      <main className="container py-10">
        <div className="max-w-xl mx-auto rounded-lg border p-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          <div className="mt-4 text-sm text-muted-foreground">Signed in as</div>
          <div className="text-lg">{user?.email}</div>
        </div>
      </main>
    </>
  );
};

export default Profile;
