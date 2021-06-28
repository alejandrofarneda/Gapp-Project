import './Landing.css';
import logo from './images/Logo1.png';
import arrow from './images/Arrow.png';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import LoginModal from './LoginModal';
import LandingQuestions from './LandingQuestions';

function Landing() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="landing-main">
            <Helmet>
                <title>GAPP - Welcome</title>
            </Helmet>
            <div className="container" onClick={() => setShowModal(true)}>
                <LandingQuestions />
            </div>
            <div
                className="landing-register"
                onClick={() => setShowModal(true)}
            >
                Registrate
            </div>

            <div className="landing-ask-answer">
                <div className="ask">Pregunta</div>
                <div className="landing-answer">Responde</div>
                <img className="landing-arrow-left" src={arrow} alt="arrow" />
                <img className="landing-arrow-right" src={arrow} alt="arrow" />
            </div>
            <img className="landing-arrow-left2" src={arrow} alt="arrow" />
            <img className="landing-arrow-right2" src={arrow} alt="arrow" />

            <div className="receive-answer">Recibe respuestas</div>

            <div className="vote">Valora las respuestas</div>

            <div className="get-votes">Obten pontuación</div>

            <div className="become-expert">Conviertete en experto</div>

            <div className="landing-intro-text">
                <h5>
                    Todavia no eres usuario?{' '}
                    <a
                        href=" "
                        onClick={() => setShowModal(true)}
                        style={{ color: 'black', fontWeight: 600 }}
                    >
                        Registrate{' '}
                    </a>
                    para tener acceso a todo el conocimiento de nuestros
                    expertos!
                </h5>
            </div>
            <div className="landing-body">
                <img
                    className="landing-logo"
                    src={logo}
                    alt="logo"
                    title="GAPP, the ultimate programming search engine"
                />
            </div>

            {showModal && <LoginModal closeModal={() => setShowModal(false)} />}
        </div>
    );
}

export default Landing;
