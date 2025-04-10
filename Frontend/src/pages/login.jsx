import '../css/main.css';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MainNav from '../Components/Nav';
import { baseUrl } from '../Data/config';

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginResponse = await fetch(baseUrl + '/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        alert(loginData.message || "Erreur de connexion");
        return;
      }

      const token = loginData.body.token;

      const profileResponse = await fetch(baseUrl + '/user/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const profileData = await profileResponse.json();

      if (!profileResponse.ok) {
        alert("Erreur lors de la récupération du profil");
        return;
      }

      const { userName, firstName, lastName } = profileData.body;

      dispatch(signIn({
        userName,
        firstName,
        lastName,
        token,
      }));

      navigate('/client');
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Erreur de connexion");
    }
  };

  return (
    <>
      <div>
        <MainNav />
      </div>

      <main className="main bg-dark">
        <div className="sign-in-wrapper">
          <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-remember">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <button type="submit" className="sign-in-button">Sign In</button>
            </form>
          </section>
        </div>
      </main>

      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
}
