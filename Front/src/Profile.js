import {
    useParams,
    NavLink,
    Switch,
    Route,
    useHistory,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './Profile.css';

import { useEffect, useState } from 'react';

import UpdateUser from './UpdateUser';
import QuestionsActivity from './QuestionsActivity';
import AnswersActivity from './AnswersActivity';
import { useSetTrigger, useTrigger } from './TriggerContext';
import { useSelector } from 'react-redux';
import TagsChart from './TagsChart';

function Profile() {
    const { q } = useParams();
    const [showModal, setShowModal] = useState(false);
    const trigger = useTrigger();
    const history = useHistory();
    const token = useSelector((s) => s.user?.token);
    const [res, setUser] = useState();
    const id_user = useSelector((u) => u.user.info.id);
    const rol = useSelector((u) => u.user.info.rol);
    const setTrigger = useSetTrigger();
    if (id_user !== Number(q) && rol !== 'admin') {
        history.push(`/profile/users/${q}`);
    }

    const [userPoints, setUserPoints] = useState();

    useEffect(() => {
        if (trigger) {
            fetch(`http://localhost:4000/api/users/${q}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
                .then((res) => res.json())
                .then(([data]) => setUser(data));

            fetch('http://localhost:4000/api/user_points/' + q, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
                .then((res) => res.json())
                .then(({ user_points }) => setUserPoints(user_points));
        }
    }, [q, trigger, setUser, token]);

    const handleClick = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    function HandleBlock() {
        if (res.isVerify) {
            fetch('http://localhost:4000/api/admin/blockuser/' + q, {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            setTrigger(trigger === 1 ? 2 : 1);
        } else {
            fetch('http://localhost:4000/api/admin/unblockuser/' + q, {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            setTrigger(trigger === 1 ? 2 : 1);
        }
    }
    function HandlePromote() {
        fetch('http://localhost:4000/api/admin/promoteuser/' + q, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        setTrigger(trigger === 1 ? 2 : 1);
    }

    return (
        <div className="profile">
            <div className="profile-title">Tu perfil</div>

            {res && (
                <>
                    <Helmet>
                        <title>Perfil de {res.name}</title>
                    </Helmet>
                    <div className="info-queso-grid">
                        <div className="box">
                            <div className="box-nombre">Nombre: {res.name}</div>
                            <div className="box-email">
                                Email:{' '}
                                {res.show_mail
                                    ? res.email
                                    : ' el usuario prefiere no mostrar su email'}
                            </div>
                            <div className="box-rol">Rol: {res.rol}</div>

                            <div className="box-descripcion">
                                Mas sobre ti: {res.description}
                            </div>
                        </div>

                        <TagsChart className="profile-queso" id_user={q} />
                    </div>

                    <div className="pencil-container">
                        <div
                            className="user-points"
                            title="Puntuación de Usuario"
                        >
                            {userPoints} puntos
                        </div>
                        {rol === 'admin' && Number(q) !== id_user && (
                            <>
                                <button
                                    onClick={HandleBlock}
                                    className="admin-button"
                                >
                                    {res.isVerify
                                        ? 'Bloquear Usuario'
                                        : 'Desbloquear Usuario'}
                                </button>

                                {res.rol === 'user' && (
                                    <button
                                        onClick={HandlePromote}
                                        className="admin-button"
                                    >
                                        Promover a Experto
                                    </button>
                                )}
                            </>
                        )}
                        <div
                            onClick={handleClick}
                            title="modifica tus datos"
                            style={{
                                backgroundImage: `url(https://www.vhv.rs/dpng/d/91-912742_paper-and-pencil-circle-icon-hd-png-download.png)`,
                            }}
                            className="pencil"
                        />
                    </div>

                    <div className="chart-questions-answers">
                        <div className="tabs-div">
                            <div className="tabs">
                                <NavLink
                                    to={`/profile/${q}/questions`}
                                    activeClassName="active"
                                >
                                    Preguntas
                                </NavLink>
                                <NavLink
                                    to={`/profile/${q}/answers`}
                                    exact
                                    activeClassName="active"
                                >
                                    Respuestas
                                </NavLink>
                            </div>
                            <div className="content">
                                <Switch>
                                    <Route
                                        path={`/profile/${q}/questions`}
                                        exact
                                    >
                                        <QuestionsActivity q={q} />
                                    </Route>
                                    <Route path={`/profile/${q}/answers`} exact>
                                        <AnswersActivity q={q} />
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>

                    {showModal && (
                        <UpdateUser
                            closeModal={() => {
                                // setTrigger();
                                setShowModal(false);
                            }}
                        />
                    )}
                </>
            )}
        </div>
    );
}
export default Profile;
