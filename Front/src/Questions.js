import { useParams } from 'react-router';
import './Questions.css';

import AddAnswer from './AddAnswer';
import Answers from './Answers';
import VoteThis from './VoteThis';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSetTrigger, useTrigger } from './TriggerContext';

function Questions() {
    const userIsAdmin = useSelector((s) => !!s.user.info.rol.includes('admin'));
    const token = useSelector((s) => s.user?.token);
    const id_user = useSelector((u) => u.user.info.id);
    const dispatch = useDispatch();
    const { q } = useParams();
    const [user, setUser] = useState();
    const [info, setInfo] = useState();
    const trigger = useTrigger();
    const setTrigger = useSetTrigger();
    const rol = useSelector((u) => u.user.info.rol);

    useEffect(() => {
        if (trigger) {
            fetch('http://localhost:4000/api/users/question/' + q, {
                //Obtengo los datos del usuario que ha realizado la pregunta
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
                .then((res) => res.json())
                .then((data) => setUser(data));

            fetch('http://localhost:4000/api/questions/' + q, {
                //Obtengo los datos de la pregunta
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
                .then((res) => res.json())
                .then((data) => setInfo(data));
        }
    }, [trigger, q, token]);

    const HandleCloseQuestion = async (e) => {
        //Para cerrar la pregunta siendo el admin
        e.preventDefault();

        const res = await fetch(
            'http://localhost:4000/api/admin/questions/' + q,
            {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }
        );
        if (res.ok) {
            setTrigger(trigger === 1 ? 2 : 1);
        } else {
            dispatch({
                type: 'NEW_ERROR',
                error: 'Error al cerrar pregunta',
            });
        }
    };

    return (
        <>
            {info && (
                <div className="question">
                    {user && (
                        <div className="question-owner">
                            <h2 className="question-title">{info.title}</h2>
                            <Link
                                to={
                                    id_user === info.id_user || rol === 'admin'
                                        ? '/profile/' +
                                          info.id_user +
                                          '/questions'
                                        : '/profile/users/' + info.id_user
                                }
                                className="profile-link"
                            >
                                <div className="question-userinfo">
                                    {user.foto ? (
                                        <div
                                            className="question-userfoto"
                                            style={{
                                                backgroundImage: `url(http://localhost:4000/uploads/${user.foto})`,
                                            }}
                                        />
                                    ) : (
                                        <div
                                            className="question-namefoto"
                                            style={{
                                                backgroundColor: user.color,
                                            }}
                                        >
                                            {user.name.slice(0, 1)}
                                        </div>
                                    )}
                                    <div className="question-username">
                                        {user.name}
                                        <br />
                                        <div className="question-date">
                                            {info.date
                                                .slice(0, 10)
                                                .slice(0, 10)
                                                .split('-')
                                                .reverse()
                                                .join('-')}{' '}
                                            at: {info.date.slice(11, 19)}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}

                    <div
                        className="question-body"
                        dangerouslySetInnerHTML={{ __html: info.body }}
                    />

                    <div className="vote-addanswer">
                        <div className="is-admin">
                            <VoteThis
                                // VoteThis es un complemento que llamaremos en Questions, Answers y Comments
                                url_post={
                                    'http://localhost:4000/api/score/question/'
                                }
                                //url_post la utilizamos para la accion de votar
                                url_user={
                                    'http://localhost:4000/api/getscore/question/'
                                }
                                //url_user lo utilizamos para saber si el usuario ha votado anteriormente la pregunta/respuesta/comentario
                                url_get={
                                    'http://localhost:4000/api/getTotalScore/question/'
                                }
                                //url_get lo utilizamos en el fetch que contamos la catidad de puntos de la pregunta/comentario/respuesta
                                id_a_votar={q}
                                clase={'question'} //comprobamos si es una pregunta, respuesta o comentario para elegir las clases
                                id_target_user={info.id_user} //servirà para comparar el id del usuario que votaría la pregunta tuviera el mismo id que la pregunta/respuesta/comentario, no lo dejaremos votar
                            />
                            {userIsAdmin &&
                                info.status !== 'PREGUNTA CERRADA' && ( //si es admin y la pregunta no esta cerrada... se muestra el boton de cerrar.
                                    <button
                                        className="admin-button"
                                        title="No admite más Respuestas"
                                        onClick={HandleCloseQuestion}
                                    >
                                        Cierra pregunta
                                    </button>
                                )}
                        </div>
                    </div>
                    <div className="vote-addanswer">
                        {info.status !== 'PREGUNTA CERRADA' && (
                            <AddAnswer id={q} /> //Si la pregunta no está cerrada, permitimos agregar respuestas
                        )}
                    </div>

                    <Answers
                        id_question={q}
                        id_question_user={info.id_user}
                        question_status={info.status}
                        id_answer_acepted={info.id_answer_acepted}
                    />
                    {/* Pasamos como parametros el status de la pregunta para comprobaciones, y el id de la pregunta que haya sido aceptada si la hubiera  */}
                </div>
            )}
        </>
    );
}

export default Questions;
