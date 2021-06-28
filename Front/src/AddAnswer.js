import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { useSetTrigger, useTrigger } from './TriggerContext';

export default function AddAnswer({ id }) {
    const user = useSelector((u) => u.user);
    const [message, setMessage] = useState('');
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const setTrigger = useSetTrigger();
    const trigger = useTrigger();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const res = await fetch('http://localhost:4000/api/answers/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + user.token,
            },
            body: JSON.stringify({
                body: message,
            }),
        });

        if (res.ok) {
            setToggle(false);
            setTrigger(trigger === 1 ? 2 : 1); //Apretamos el gatillo para que Answers vuelva a hacer sus fetchs
        } else {
            dispatch({
                type: 'NEW_ERROR',
                error: 'Error al enviar respuesta',
            });
        }
    };

    return (
        <>
            {!toggle && (
                <div
                    className="add-answer-form-off"
                    onClick={() => setToggle(true)}
                >
                    Escribe una Respuesta...
                </div>
            )}

            {toggle && (
                <div className="add-answer">
                    <form className="add-answer-form" onSubmit={handleSubmit}>
                        <ReactQuill
                            value={message}
                            placeholder="Escribe una Respuesta..."
                            onChange={setMessage}
                            required
                            className="add-answer-quill"
                        />

                        <button className="add-answer-button">Enviar</button>
                    </form>
                </div>
            )}
        </>
    );
}
