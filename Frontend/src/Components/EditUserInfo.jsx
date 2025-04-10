import { useDispatch, useSelector } from 'react-redux';
import { updateUserName } from '../redux/authSlice';
import { useState } from 'react';
import {baseUrl} from '../Data/config'

export default function EditUserInfo({ onCancel }) {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState(user.userName);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch( baseUrl +'/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userName }),
    });

    if (!response.ok) {
      alert("Erreur lors de la mise à jour");
      return;
    }

    dispatch(updateUserName(userName));
    onCancel(); // ferme le formulaire
  };

  return (
    <section className="sign-in-content">
      <h1 className="title-dark">Edit user info</h1>

      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label className="label-dark">User name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <label className="label-dark">First name:</label>
          <input type="text" value={user.firstName} disabled />
        </div>

        <div className="input-wrapper">
          <label className="label-dark">Last name:</label>
          <input type="text" value={user.lastName} disabled />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
          <button className="sign-in-button" type="submit">Save</button>
          <button className="sign-in-button" type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </section>
  );
}
