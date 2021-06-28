import { Link } from 'react-router-dom';
import useFetch from './useFetch';

function SearchResults({ q }) {
    const results = useFetch(`http://localhost:4000/api/questions/tags/${q}`);
    console.log(results);
    return (
        <>
            <div className="home-results">
                {!results?.questions?.length && (
                    <div className="no-question">
                        <div>Al parecer no pudimos encontrar tu pregunta</div>
                        <div>
                            puedes realizar una{' '}
                            <Link
                                to="/addQuestion"
                                style={{
                                    color: 'black',
                                    borderRadius: 5,
                                    padding: 5,
                                    textAlign: 'center',
                                    fontWeight: 600,
                                }}
                            >
                                Aqui
                            </Link>
                        </div>
                    </div>
                )}

                {results?.questions?.slice(0, 8).map((e) => (
                    <Link
                        key={e.id_question}
                        to={`/questions/${e.id_question}`}
                        className="search-results-each"
                    >
                        <div className="home-results-activity-box">
                            <div className="home-activity-q-a">
                                {e.title.length >= 36
                                    ? e.title.slice(0, 35) + '...'
                                    : e.title}
                            </div>
                            <div className="home-activity-date">
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
                {!results && <div>Loading...</div>}
            </div>
        </>
    );
}

export default SearchResults;
