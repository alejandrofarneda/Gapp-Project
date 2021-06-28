import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from './useFetch';

export default function FindUsers() {
  const history = useHistory();
  const [search, setSearch] = useState('');

  const results = useFetch('http://localhost:4000/api/name/' + search);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      history.push('/search/users/' + search);
      setSearch('');
    }
  };

  return (
    <div className="search-users">
      <h1>Encuentra un Usuario:</h1>

      <form onSubmit={handleSubmit}>
        <datalist id="users">
          {results?.user?.map((u) => (
            <option id={u.id_user} value={u.name_user}></option>
          ))}
        </datalist>
        <input
          placeholder="Nombre de Usuario..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          list={search !== '' && 'users'}
        />
        <button>Busca</button>
      </form>
    </div>
  );
}
