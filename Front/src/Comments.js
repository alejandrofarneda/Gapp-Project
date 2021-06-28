import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AddComment from './AddComment';
import { useTrigger } from './TriggerContext';
import VoteThis from './VoteThis';

export default function Comments({ id_answer_father, id_target_user }) {
    const [newComment, setNewComment] = useState();
    const token = useSelector((s) => s.user?.token);
    const trigger = useTrigger();
    const [res, setRes] = useState();
    const id_user = useSelector((s) => s.user?.info.id);
    const rol = useSelector((u) => u.user.info.rol);

    useEffect(() => {
        if (trigger) {
            fetch(`http://localhost:4000/api/comments/${id_answer_father}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
                .then((res) => res.json())
                .then((data) => setRes(data));
        }
    }, [trigger, id_answer_father, token]);
    return (
        <>
            <div className="vote-addanswer">
                <VoteThis //Aqui votaremos a la respuesta
                    url_post={'http://localhost:4000/api/score/answer/'}
                    url_user={'http://localhost:4000/api/getscore/answer/'}
                    url_get={'http://localhost:4000/api/getTotalScore/answer/'}
                    id_a_votar={id_answer_father}
                    clase={'answer'}
                    id_target_user={id_target_user} //para comprobar si es el creador de la respuesta que va a votar
                />
                <AddComment
                    id_answer_father={id_answer_father}
                    setNewComment={setNewComment}
                    newComment={newComment}
                />
            </div>
            {res?.comments &&
                res.comments.map((a) => (
                    <div key={a.id_answer} className="comment">
                        <Link
                            to={
                                id_user === a.id_user || rol === 'admin'
                                    ? '/profile/' + a.id_user + '/questions'
                                    : '/profile/users/' + a.id_user
                            }
                            className="profile-link"
                        >
                            <div className="comment-owner">
                                {a.foto ? (
                                    <div
                                        className="comment-userfoto"
                                        style={{
                                            backgroundImage: `url(http://localhost:4000/uploads/${a.foto})`,
                                        }}
                                    />
                                ) : (
                                    <div
                                        className="comment-namefoto"
                                        style={{
                                            backgroundColor: a.color,
                                        }}
                                    >
                                        {a.name_user.slice(0, 1)}
                                    </div>
                                )}
                                <div className="comment-username">
                                    {a.name_user}
                                    <div className="comment-date">
                                        {a.creation_date
                                            .slice(0, 10)
                                            .slice(0, 10)
                                            .split('-')
                                            .reverse()
                                            .join('-')}{' '}
                                        at: {a.creation_date.slice(11, 19)}
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <div className="comment-body">{a.body}</div>

                        <VoteThis //Aqui votaremos al comentario
                            url_post={'http://localhost:4000/api/score/answer/'}
                            url_user={
                                'http://localhost:4000/api/getscore/answer/'
                            }
                            url_get={
                                'http://localhost:4000/api/getTotalScore/answer/'
                            }
                            id_a_votar={a.id_answer}
                            clase={'comment'}
                            id_target_user={a.id_user}
                        />
                    </div>
                ))}
        </>
    );
}
