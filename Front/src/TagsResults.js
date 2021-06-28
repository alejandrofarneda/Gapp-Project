import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import useFetch from './useFetch';
import './TableTags.css';
import Helmet from 'react-helmet';
function TagsResults() {
    const { q } = useParams();

    const results = useFetch(`http://localhost:4000/api/questions/bytags/${q}`);
    return (
        <div className="tag-results">
            <Helmet>
                <title>Preguntas por Tag</title>
            </Helmet>
            <div className="tags-results-title">
                #<span className="tags-results-title-tagname">{q}</span>{' '}
            </div>

            {results?.questions.map((e) => (
                <Link
                    key={e.id_question}
                    to={`/questions/${e.id_question}`}
                    className="search-results-each"
                >
                    <div className="results-activity-box">
                        <div className="activity-q-a">
                            {e.title.length >= 65
                                ? e.title.slice(0, 65) + '...'
                                : e.title}
                        </div>
                        <div className="activity-date">
                            {e.creation_date
                                .slice(0, 10)
                                .split('-')
                                .reverse()
                                .join('-')}{' '}
                            at {e.creation_date.slice(11, 19)}
                        </div>
                    </div>
                </Link>
            ))}

            {!results && <i>Loading...</i>}
            {results && !results.questions.lenght < 1 && (
                <i>No results found!</i>
            )}
        </div>
    );
}

export default TagsResults;
