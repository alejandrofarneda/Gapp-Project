import useFetch from './useFetch';
import './TableTags.css';
import { Link } from 'react-router-dom';
import { useTrigger } from './TriggerContext';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function TopTags() {
  const trigger = useTrigger();
  const token = useSelector((s) => s.user?.token);
  const [result, setResult] = useState();

  useEffect(() => {
    if (trigger) {
      fetch('http://localhost:4000/api/tags/incidence/', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((res) => res.json())
        .then((data) => setResult(data));
    }
  }, [trigger, setResult, token]);
  return (
    <div className="table-tags">
      <div className="head">Top Tags</div>

      {result &&
        result.tags.slice(0, 5).map((s) => (
          <Link to={`/tagsresults/${s.tag_name}`} className="top-tags-tags">
            #{s.tag_name}
          </Link>
        ))}
    </div>
  );
}
