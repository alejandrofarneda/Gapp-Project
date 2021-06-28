async function refreshUser(email, password, dispatch) {
    const res = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
        const data = await res.json();
        dispatch({ type: 'LOGIN', user: data });
    } else {
        const error = new Error('Error de registro, valida tu usuario');
        alert(error);
    }
}

function random_bg_color() {
    var x = Math.floor(Math.random() * 255);
    var y = Math.floor(Math.random() * 255);
    var z = Math.floor(Math.random() * 255);
    return 'rgb(' + x + ',' + y + ',' + z + ')';
}

function randomQuote() {
    const array = [
        `"Creíamos que teníamos las respuestas, pero era la pregunta la que estaba equivocada."
Bono'`,
        `“No hay respuestas correctas a preguntas equivocadas”. 
Úrsula Le Guin`,
        `“Mi mayor fortaleza como consultor es ser ignorante y hacer algunas preguntas”
Peter Drucker`,
        `“La formulación de un problema, es más importante que su solución.”
ALBERT EINSTEIN
`,
        `“Las preguntas no cambian la verdad. Pero le dan movimiento.”
GIANNINA BRASCHI`,
    ];
    const newArray = Math.floor(Math.random() * array.length);

    return array[newArray];
}

module.exports = { refreshUser, random_bg_color, randomQuote };
