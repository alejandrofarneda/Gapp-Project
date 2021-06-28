import { useState } from 'react';
import Helmet from 'react-helmet';
import SearchResults from './SearchResults';

function Search() {
    const [search, setSearch] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="search">
            <div className="search-input">
                <div className="search-title-input">Busca tu pregunta</div>
                <Helmet>
                    <title>GAPP - HOME</title>
                </Helmet>
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="..."
                        value={search === ' ' ? '' : search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button>🔍</button>
                </form>
            </div>

            {search && search !== ' ' && <SearchResults q={search} />}
        </div>
    );
}

export default Search;
