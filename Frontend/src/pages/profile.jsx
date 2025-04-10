import { useSelector } from 'react-redux';
import { useState } from 'react';
import '../css/main.css';
import MainNav from '../Components/Nav';
import EditUserInfo from '../Components/EditUserInfo';
import Account from '../Components/account';
import accountsData from '../Data/accountData';

export default function Client() {
  const user = useSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div>
        <MainNav />
      </div>

      <main className="main bg-dark">
        <div className="client-header">
          {isEditing ? (
            <EditUserInfo onCancel={() => setIsEditing(false)} />
          ) : (
            <>
              <h1 className="client-title">
                Welcome back<br />{user?.userName}!
              </h1>
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                Edit Name
              </button>
            </>
          )}
        </div>

        <h2 className="sr-only">Accounts</h2>

        <div className="account-section">
          {accountsData.map((account) => (
            <Account
              key={account.id}
              title={account.title}
              amount={account.amount}
              description={account.description}
            />
          ))}
        </div>
      </main>

      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
}
