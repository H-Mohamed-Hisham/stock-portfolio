import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Shadcn
import { Button } from "@/components/ui/button";

// Redux
import { authState, setSignOut } from "@/providers/redux/slice/auth-slice";

// Constants
import { SIGN_IN_URL } from "@/constants/routes";

export function AuthButton() {
  // Dispatch
  const dispatch = useDispatch();

  // Redux
  const { user } = useSelector(authState);

  // Handle Sign Out
  function handleSignOut() {
    dispatch(setSignOut());
  }

  return (
    <>
      {user ? (
        <Button
          variant="destructive"
          className="font-semibold text-white"
          onClick={() => handleSignOut()}
        >
          Sign Out
        </Button>
      ) : (
        <Link to={SIGN_IN_URL}>
          <Button className="font-semibold">Sign In</Button>
        </Link>
      )}
    </>
  );
}
