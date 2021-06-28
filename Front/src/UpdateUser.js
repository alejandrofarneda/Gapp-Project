import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './UpdateUser.css';
import { useSetTrigger, useTrigger } from './TriggerContext';

function UpdateUser({ closeModal }) {
    const user = useSelector((u) => u.user);

    const [username, setUsername] = useState(user.info.name);

    const [description, setDescription] = useState(user.info.description);

    const [showMail, setShowMail] = useState(user.info.show_mail);

    const dispatch = useDispatch();

    const [file, setFile] = useState();
    const setTrigger = useSetTrigger();
    const trigger = useTrigger();

    const foto = user.info.foto
        ? `http://localhost:4000/uploads/${user.info.foto}`
        : null;

    const [preview, setPreview] = useState(foto);

    const handleFile = (e) => {
        const f = e.target.files[0];
        setFile(f);
        setPreview(f ? URL.createObjectURL(f) : user.info.foto);
    };

    const [showMailToString, setShowMailToString] = useState();

    useEffect(() => {
        setShowMailToString(showMail === 0 ? '0' : '1');
    }, [showMail]);

    const handleClick = () => {
        setShowMail(showMail === 0 ? 1 : 0);
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const headers = {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + user.token,
            };
            //Si existe file hacemos la peticion para cambiar el avatar

            if (file) {
                const payload = new FormData();
                payload.append('avatar', file);

                await fetch('http://localhost:4000/api/users/avatar', {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + user.token,
                    },
                    body: payload,
                });
            }

            //cambiamos los datos del usuario por los del formulario
            const res = await fetch('http://localhost:4000/api/users', {
                method: 'PUT',
                body: JSON.stringify({
                    name_user: username,
                    show_mail: showMailToString,
                    descritpion: description,
                }),
                headers,
            });

            if (res.ok) {
                const res = await fetch(
                    `http://localhost:4000/api/users/${user.info.id}`,
                    { headers }
                );

                const [userInfo] = await res.json();

                dispatch({ type: 'INFO', info: userInfo });
                setTrigger(trigger === 1 ? 2 : 1);

                closeModal();
            } else {
                throw new Error('AError actualizando datos');
            }
        } catch (error) {
            dispatch({ type: 'NEW_ERROR', error: error.message });
        }
    };

    return (
        <>
            <div
                className="modal-bg"
                onClick={() => setTrigger(trigger === 1 ? 2 : 1) + closeModal()}
            >
                <div className="modal-fg" onClick={(e) => e.stopPropagation()}>
                    <form className="update-user" onSubmit={handleSubmit}>
                        <h1 className="update-user-h1">Actualiza tus datos</h1>
                        <label>
                            {preview ? (
                                <div
                                    className="preview"
                                    style={{
                                        backgroundImage: `url(${preview})`,
                                    }}
                                />
                            ) : (
                                <div
                                    className="namefoto"
                                    style={{
                                        backgroundColor: user.info.color,
                                    }}
                                >
                                    {username.slice(0, 1)}
                                </div>
                            )}

                            <input type="file" onChange={handleFile} />
                        </label>
                        <label className="nombre">
                            Nombre:{' '}
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                        <label className="text-area">
                            Sobre ti:{' '}
                            <textarea
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value ? e.target.value : ' '
                                    )
                                }
                            />
                        </label>
                        <label className="email">
                            Email visible?{' '}
                            <input
                                type="checkbox"
                                checked={showMail}
                                onChange={handleClick}
                            />
                        </label>
                        <button>Actualizar datos</button>
                    </form>
                </div>
            </div>
        </>
    );
}
export default UpdateUser;
