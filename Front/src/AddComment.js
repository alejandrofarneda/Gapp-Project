import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSetTrigger, useTrigger } from './TriggerContext';

export default function AddComment({ id_answer_father, setNewComment }) {
    const user = useSelector((u) => u.user);
    const [message, setMessage] = useState('');
    const [toggle, setToggle] = useState(false);
    const setTrigger = useSetTrigger();
    const trigger = useTrigger();

    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const res = await fetch(
            'http://localhost:4000/api/comments/' + id_answer_father,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user.token,
                },
                body: JSON.stringify({
                    body: message,
                }),
            }
        );
        if (res.ok) {
            setToggle(false);
            setTrigger(trigger === 1 ? 2 : 1);
        } else {
            dispatch({
                type: 'NEW_ERROR',
                error: 'Error al enviar Comentario',
            });
        }
    };

    return (
        <>
            {!toggle && (
                <div
                    className="add-comment-form-off"
                    onClick={() => setToggle(true)}
                >
                    Escribe un Comentario...
                </div>
            )}
            {toggle && (
                <div className="add-comment">
                    <form className="add-comment-form" onSubmit={handleSubmit}>
                        <input
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            className="add-comment-input"
                            placeholder="Escribe un Comentario..."
                        />

                        <button className="add-comment-button">Enviar</button>
                    </form>
                </div>
            )}
        </>
    );
}
