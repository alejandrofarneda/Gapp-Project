import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';
import { useHistory } from 'react-router';
import './antd.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { randomQuote } from './helpers';
import { useSetTrigger, useTrigger } from './TriggerContext';

const { Option } = Select;

function AddQuestion() {
  const history = useHistory();
  const user = useSelector((u) => u.user);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const setTrigger = useSetTrigger();

  const tagsToLowerCase = tags
    .filter((tag) => tag)
    .map((tag) => tag.replace(/[^A-Za-z0-9]/g, '').trim())
    .filter((tag) => tag !== '');

  const dispatch = useDispatch();
  const [tips] = useState(randomQuote());
  const trigger = useTrigger();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitle('');
    setMessage('');
    setTags([]);
    const res = await fetch('http://localhost:4000/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
      body: JSON.stringify({
        title: title,
        body: message,
        tags: tagsToLowerCase,
      }),
    });
    if (res.ok) {
      const question = await res.json();
      setTrigger(trigger === 1 ? 2 : 1);
      history.push('/questions/' + question.question.id_question);
    } else {
      dispatch({
        type: 'NEW_ERROR',
        error: 'Error al enviar Pregunta',
      });
    }
  };

  return (
    <div className="add-question-page">
      <form onSubmit={handleSubmit} className="form-quill">
        <div className="form-p-input">
          <p className="add-question-p">Título:</p>
          <input
            className="add-question-input"
            placeholder="Escribe un titulo para tu pregunta...."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="react-quill-div">
          <ReactQuill
            value={message}
            onChange={setMessage}
            required
            placeholder="Escribe tu pregunta..."
          />

          <Select
            mode="tags"
            style={{ width: 300 }}
            value={tags}
            onChange={setTags}
            placeholder="Tags..."
            className="tags-input"
            onKeyPress={(e) => e.key === 'Enter' && e.key === 'Tab'}
          >
            <Option></Option>
          </Select>
        </div>

        <button className="quill-button">Postear Pregunta</button>
      </form>
      <div className="tips">
        <div className="tips-einstein">{tips} </div>
        <div className="tips-consejos">
          Algunos tips para realizar tu pregunta:
          <div>
            <h5>1. ¿QUIEN – QUE – CUANDO – DONDE – CUAL – POR QUE Y COMO?</h5>
            Intenta colocar estas palabras que harán referencia. Al ir desde la
            simple pregunta «sí / no» en el inicio hasta el «por qué» como
            pregunta final, te darás cuenta de que las consultas tienden a
            estimular el pensamiento más reflexivo
          </div>
          <div>
            <h5>2. CREA UNA PREGUNTA ATRACTIVA</h5>
            Para formular preguntas poderosas, es importante alentar a la
            reflexión y apuntar a estimular el aprendizaje y la colaboración.
            Nuestros expertos se ecuentran siempre al acecho de preguntas
            interesantes.
          </div>
          <div>
            <h5>3. COMPARTE ALGO DE CÓDIGO</h5>
            Comparte el código que tengas escrito para que nuestros expertos
            tengan la posibilidad de comprender el contexto y facilitar una
            respuesta facilmente adaptable a tu proyecto.
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddQuestion;
