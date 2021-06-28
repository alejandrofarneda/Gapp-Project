import { useDispatch, useSelector } from 'react-redux';

export default function ErrorMessage() {
    const error = useSelector((s) => s.error);
    console.log(error);
    const dispatch = useDispatch();

    return error ? (
        <div className="error">
            <p>{error}</p>

            <div>
                <button onClick={() => dispatch({ type: 'CLEAR_ERROR' })}>
                    Cerrar
                </button>
            </div>
        </div>
    ) : null;
}
