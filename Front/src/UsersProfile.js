import { useParams } from 'react-router-dom';
import TagsChart from './TagsChart';
import useFetch from './useFetch';
import './UsersProfile.css';

export default function UsersProfile() {
  const { q } = useParams();
  const results = useFetch('http://localhost:4000/api/users/' + q);
  return (
    <div className="perfil-usuario-tercero">
      {!results && <i>Loading...</i>}
      {results?.error ? (
        <i>No results found!</i>
      ) : (
        results?.map((u) => (
          <div key={u.id} className="datos-usuario">
            <div className="perfil-usuario-tercero-title">
              Perfil de usuario
            </div>
            {u.foto ? (
              <div
                className="avatar"
                style={{
                  backgroundImage: `url(http://localhost:4000/uploads/${u.foto})`,
                }}
              />
            ) : (
              <div
                className="namefoto"
                style={{
                  backgroundColor: u.color,
                }}
              >
                {u.name.slice(0, 1)}
              </div>
            )}
            <div className="datos-usuario-nombre">Nombre: {u.name}</div>
            <div className="datos-usuario-email">
              Email:{' '}
              {u.show_mail
                ? u.email
                : 'El usuario prefiere no mostrar su email'}
            </div>
            <div className="datos-usuario-descripcion">
              <div>Descripción: {u.description}</div>
            </div>
            <TagsChart className="datos-usuario-queso" id_user={u.id} />
            <div className="datos-usuario-punto" />
          </div>
        ))
      )}
    </div>
  );
}
