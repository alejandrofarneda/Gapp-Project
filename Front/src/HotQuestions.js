import useFetch from './useFetch';
import { Link } from 'react-router-dom';

export default function HotQuestions() {
    const results = useFetch('http://localhost:4000/api/questions/home/hot');

    return (
        <div>
            {results &&
                results.questions?.map((e) => (
                    <div key={e.id_question}>
                        <Link to={`/questions/${e.id_question}`}>
                            <div className="results-activity-box">
                                <div className="activity-q-a">
                                    {e.title.length >= 36
                                        ? e.title.slice(0, 35) + '...'
                                        : e.title}
                                </div>
                                <div className="activity-date">
                                    {e.creation_date.slice(0, 10)}{' '}
                                    {e.creation_date.slice(11, 19)}
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}

            {!results && <i>Loading...</i>}
            {results && !results.questions.length && (
                <i>Todavia no has hecho ninguna pregunta</i>
            )}
        </div>
    );
}
