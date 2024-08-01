async function handleLogin(event) {
    event.preventDefault();

    //debugger;

    const url = 'http://127.0.0.1:8000/token'; // Reemplaza con la URL de tu endpoint de login

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const datosUsuario = {
      username: username,
      password: password
    };
    
    // Opciones para la solicitud fetch
    const opciones = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(datosUsuario)
    };
    
    // Realizar la solicitud fetch
    fetch(url, opciones)
      .then(response => {
        if (!response.ok) {
            cMensaje = 'Error General.';
            if (response.status === 401) {
                cMensaje = 'Usuario o Clave incorrectos. Acceso no autorizado (401).'
            }
            else{
                cMensaje = 'Error en inicio de sesión: ' + response.status
            }
            alert(cMensaje);
            throw new Error('Error en la solicitud de login: ' + response.status);
        }
        return response.json(); // Convertir la respuesta a JSON
      })
      .then(data => {
        //acceso exitoso
        // Guardar el token y el rol del usuario en localStorage
        localStorage.setItem('accessToken', data.access_token);

        //redirecciona a la pagina principal
        //la pagina principal redirecicona segun el rom
        window.location.href = 'http://127.0.0.1:5500/#';

        //alert(data.access_token);
        //console.log('Token de acceso:', data.access_token);
      })
      .catch(error => {
        console.error('Error al intentar iniciar sesión:', error);
      });
}
