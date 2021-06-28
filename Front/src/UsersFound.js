import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import useFetch from './useFetch';
import './UsersFound.css';

export default function UsersFound() {
    const { q } = useParams();
    const results = useFetch('http://localhost:4000/api/name/' + q);
    const user = useSelector((u) => u.user.info.id);
    const rol = useSelector((u) => u.user.info.rol);

    return (
        <>
            <div className="users-h3">Nuestros Usuarios</div>
            <Helmet>
                <title>GAPP - Users</title>
            </Helmet>
            <div className="user-found">
                {!results && <i>Loading...</i>}
                {results?.error ? (
                    <i>No results found!</i>
                ) : (
                    results?.user.map((u) => (
                        <Link
                            to={
                                user === u.id_user || rol === 'admin'
                                    ? '/profile/' + u.id_user + '/questions'
                                    : '/profile/users/' + u.id_user
                            }
                        >
                            {u.foto ? (
                                <div className="user-data" key={u.id_user}>
                                    <h5>{u.name_user}</h5>
                                    <div
                                        className="user-foto"
                                        style={{
                                            backgroundImage: `url(http://localhost:4000/uploads/${u.foto})`,
                                        }}
                                    />
                                    <div>
                                        {u?.descritpion?.length >= 50
                                            ? u.descritpion.slice(0, 50) + '...'
                                            : u.descritpion}
                                    </div>
                                </div>
                            ) : (
                                <div className="user-data" key={u.id_user}>
                                    <h5>{u.name_user}</h5>
                                    <div
                                        className="user-name-foto"
                                        style={{
                                            backgroundColor: u.color,
                                        }}
                                    >
                                        {u.name_user.slice(0, 1)}
                                    </div>
                                    <div>
                                        {u?.descritpion?.length >= 50
                                            ? u.descritpion.slice(0, 50) + '...'
                                            : u.descritpion}
                                    </div>
                                </div>
                            )}
                        </Link>
                    ))
                )}
            </div>
        </>
    );
}
