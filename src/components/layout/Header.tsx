import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { user, signOut } = useAuth();
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-block h-6 w-6 rounded-md" style={{ background: "var(--gradient-primary)" }} />
          <span>QuickCourt</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/discover" className={({isActive})=> isActive?"text-primary font-medium":"text-muted-foreground hover:text-foreground"}>Find Courts</NavLink>
          <NavLink to="/bookings" className={({isActive})=> isActive?"text-primary font-medium":"text-muted-foreground hover:text-foreground"}>My Bookings</NavLink>
          <NavLink to="/help" className={({isActive})=> isActive?"text-primary font-medium":"text-muted-foreground hover:text-foreground"}>Help</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <NavLink to="/profile" className="text-sm text-muted-foreground hover:text-foreground">Profile</NavLink>
              <Button variant="secondary" onClick={signOut}>Log out</Button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="text-sm text-muted-foreground hover:text-foreground">Log in</NavLink>
              <NavLink to="/login"><Button className="hover-glow">Get Started</Button></NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
