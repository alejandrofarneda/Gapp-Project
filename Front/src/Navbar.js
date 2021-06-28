import { Link } from 'react-router-dom';
import logo from './images/Logo.png';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import LoginModal from './LoginModal';

function Navbar() {
    const isLoggedIn = useSelector((s) => !!s.user.token);

    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.stopPropagation();
        dispatch({
            type: 'LOGOUT',
        });
    };
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="navbar">
                {isLoggedIn ? (
                    <Link to="/" className="logo-container">
                        <div
                            style={{
                                backgroundImage: `url(${logo})`,
                            }}
                            id="app-logo"
                            title="Home"
                        />
                    </Link>
                ) : (
                    <Link to="/landing" className="logo-container">
                        <div
                            style={{
                                backgroundImage: `url(${logo})`,
                            }}
                            id="app-logo"
                        />
                    </Link>
                )}

                {isLoggedIn ? (
                    <Link className="pregunta-button" to="/addQuestion">
                        Haz una Pregunta
                    </Link>
                ) : (
                    <form
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <input
                            className="log-input"
                            onClick={() => setShowModal(true)}
                            placeholder="Busca tu Pregunta"
                        />
                        <span style={{ backgroundColor: 'white' }}>🔍</span>
                    </form>
                )}
                <div className="user-area">
                    {!isLoggedIn && (
                        <div
                            className="log-button"
                            onClick={() => setShowModal(true)}
                        >
                            Iniciar sesión
                        </div>
                    )}
                    {isLoggedIn && (
                        <Link to={'/landing'}>
                            <div className="log-button" onClick={handleLogout}>
                                LogOut
                            </div>
                        </Link>
                    )}
                </div>
            </div>
            {showModal && <LoginModal closeModal={() => setShowModal(false)} />}
        </>
    );
}

export default Navbar;
