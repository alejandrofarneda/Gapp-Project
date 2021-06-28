import { Link } from 'react-router-dom';
import useFetch from './useFetch';
import './Activity.css';

function AnswersActivity({ q }) {
    const results = useFetch(`http://localhost:4000/api/answers/user/${q}`);

    return (
        <div className="activity-box">
            <h5 className="activity-title">Preguntas que has contestado</h5>
            {results &&
                results.answer.map((e) => (
                    <div key={e.id_question}>
                        <Link to={`/questions/${e.id_question}`}>
                            <div className="results-activity-box">
                                <div className="activity-q-a">
                                    {e.title.length >= 36
                                        ? e.title.slice(0, 35) + '...'
                                        : e.title}
                                </div>
                                <div className="activity-date">
                                    {e.creation_date.slice(0, 10)} at{' '}
                                    {e.creation_date.slice(11, 19)}
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}

            {results && !results.answer.length && (
                <i>Todavia no has contestado a ninguna pregunta</i>
            )}
        </div>
    );
}
export default AnswersActivity;
