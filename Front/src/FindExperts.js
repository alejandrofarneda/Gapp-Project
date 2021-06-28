import { Link } from 'react-router-dom';
import './FindExperts.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useTrigger } from './TriggerContext';

export default function FindExperts() {
    const q = 'expert';
    const token = useSelector((s) => s.user?.token);
    const trigger = useTrigger();
    const [results, setRes] = useState();
    const rol = useSelector((u) => u.user.info.rol);

    useEffect(() => {
        if (trigger) {
            fetch('http://localhost:4000/api/users/rolrandom/' + q, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
                .then((res) => res.json())
                .then((data) => setRes(data));
        }
    }, [trigger, q, token]);

    const user = useSelector((u) => u.user.info.id);
    return (
        <div className="find-experts">
            <Link to="/expertsfound">
                <button className="find-experts-button" type="button">
                    Expertos
                </button>
            </Link>
            <div className="expert-card">
                {results &&
                    results[0].users.map((e) => (
                        <Link
                            to={
                                user === e.id_user || rol === 'admin'
                                    ? '/profile/' + e.id_user + '/questions'
                                    : '/profile/users/' + e.id_user
                            }
                        >
                            {e.foto ? (
                                <div className="user--data" key={e.id_user}>
                                    <h5>{e.name_user}</h5>
                                    <div
                                        className="expert-avatar"
                                        style={{
                                            backgroundImage: `url(http://localhost:4000/uploads/${e.foto})`,
                                        }}
                                    />
                                    <div>
                                        {e.descritpion.length >= 50
                                            ? e.descritpion.slice(0, 50) + '...'
                                            : e.descritpion}
                                    </div>
                                </div>
                            ) : (
                                <div className="user--data" key={e.id_user}>
                                    <h5>{e.name_user}</h5>
                                    <div
                                        className="expert-name-foto"
                                        style={{
                                            backgroundColor: e.color,
                                        }}
                                    >
                                        {e.name_user.slice(0, 1)}
                                    </div>
                                    <div>
                                        {e.descritpion.length >= 50
                                            ? e.descritpion.slice(0, 50) + '...'
                                            : e.descritpion}
                                    </div>
                                </div>
                            )}
                        </Link>
                    ))}
            </div>
        </div>
    );
}
