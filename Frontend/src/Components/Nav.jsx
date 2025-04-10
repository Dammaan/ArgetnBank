import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../redux/authSlice';

export default function MainNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(signOut());
    navigate('/');
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        {isAuthenticated ? (
          <>
            <Link className="main-nav-item" to="/client">
              <i className="fa fa-user-circle"></i> {user?.userName}
            </Link>
            <span
              className="main-nav-item"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              <i className="fa fa-sign-out"></i> Sign Out
            </span>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}


