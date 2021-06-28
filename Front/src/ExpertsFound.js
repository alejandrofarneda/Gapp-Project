import useFetch from './useFetch';
import './UsersFound.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

export default function ExpertsFound() {
    const s = 'expert';
    const result = useFetch('http://localhost:4000/api/users/rol/' + s);
    const id_user = useSelector((u) => u.user.info.id);
    const rol = useSelector((u) => u.user.info.rol);

    return (
        <>
            <div className="experts-h3">Nuestros expertos</div>
            <Helmet>
                <title>GAPP - Experts</title>
            </Helmet>
            <div className="experts-found">
                {result &&
                    result[0].users.map((h) => (
                        <Link
                            className="experts-gap"
                            to={
                                id_user === h.id_user || rol === 'admin'
                                    ? '/profile/' + h.id_user + '/questions'
                                    : '/profile/users/' + h.id_user
                            }
                        >
                            {h.foto ? (
                                <div className="user-data" key={h.id_user}>
                                    <h5>{h.name_user}</h5>
                                    <div
                                        className="user-foto"
                                        style={{
                                            backgroundImage: `url(http://localhost:4000/uploads/${h.foto})`,
                                        }}
                                    />
                                    <div>
                                        {h.descritpion.length >= 50
                                            ? h.descritpion.slice(0, 50) + '...'
                                            : h.descritpion}
                                    </div>
                                </div>
                            ) : (
                                <div className="user-data" key={h.id_user}>
                                    <h5>{h.name_user}</h5>
                                    <div
                                        className="user-name-foto"
                                        style={{
                                            backgroundColor: h.color,
                                        }}
                                    >
                                        {h.name_user.slice(0, 1)}
                                    </div>
                                    <div>
                                        {h.descritpion.length >= 50
                                            ? h.descritpion.slice(0, 50) + '...'
                                            : h.descritpion}
                                    </div>
                                </div>
                            )}
                        </Link>
                    ))}
            </div>
        </>
    );
}
