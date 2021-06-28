import { useSelector } from 'react-redux';
import './Article.css';
import { Link } from 'react-router-dom';
import FindUsers from './FindUsers';
import { useEffect, useState } from 'react';
import { useTrigger } from './TriggerContext';
import medal from './images/medal-icon-symbol-sign-vector.jpg';

export default function Article() {
  const id = useSelector((s) => s.user.info.id);
  const [user, setUser] = useState();
  const token = useSelector((s) => s.user?.token);
  const trigger = useTrigger();
  const [userPoints, setUserPoints] = useState();

  useEffect(() => {
    if (trigger) {
      fetch(`http://localhost:4000/api/users/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((res) => res.json())
        .then(([data]) => setUser(data));

      fetch('http://localhost:4000/api/user_points/' + id, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((res) => res.json())
        .then(({ user_points }) => setUserPoints(user_points));
    }
  }, [id, trigger, setUser, token]);

  return (
    <div className="article">
      {user && (
        <>
          <Link to={'/profile/' + user.id + '/questions'}>
            {user.foto ? (
              <div
                className="avatar"
                style={{
                  backgroundImage: `url(http://localhost:4000/uploads/${user.foto})`,
                }}
                title="Perfil"
              />
            ) : (
              <div
                className="namefoto"
                style={{
                  backgroundColor: user.color,
                }}
                title="Perfil"
              >
                {user.name.slice(0, 1)}
              </div>
            )}
          </Link>
          {user.rol === 'expert' && (
            <div
              className="medal"
              style={{
                backgroundImage: `url(${medal})`,
              }}
              title="Usuario Experto"
            />
          )}
          <div className="article-rol">
            {' '}
            {user.rol === 'admin'
              ? 'Admin'
              : user.rol === 'expert'
              ? 'Experto'
              : 'User'}
          </div>

          <p className="username">{user.name}</p>
          <div className="article-points" title="Puntuación de Usuario">
            {userPoints} puntos
          </div>

          <FindUsers />
        </>
      )}
    </div>
  );
}
