# API REST para que otros sistemas puedan conectarse al Blog de Viajes
  

*   Prueba la API usando curl 
Endpoint	                                                              |         Resultado

GET /api/v1/publicaciones	                                              |         JSON con todas las publicaciones.
GET /api/v1/publicaciones?busqueda=<palabra>	                          |         JSON con todas las publicaciones que tengan la palabra <palabra> en el título, contenido o resumen.                                                                                   resumen.
GET /api/v1/publicaciones/<id>                                          |         Publicación con id = <id>. Considera cuando el id no existe.
GET /api/v1/autores                                                     |         JSON con todos los autores.
GET /api/v1/autores/<id>	                                              |         JSON con la información del autor con id = <id> y este contiene sus publicaciones. Considera cuando el id no existe.                                                                                      cuando el id no existe.
POST /api/v1/autores	                                                  |         Crea un autor dado un pseudónimo, email, contraseña. Validar peticiones con pseudónimos duplicados o email duplicados. Devuelve un JSON con el objeto creado.                                                                                     duplicados o email duplicados. Devuelve un JSON con el objeto creado.
POST /api/v1/publicaciones?email=<email>&contrasena=<contrasena>	      |         Crea una publicación para el usuario con <email> = email,si este se puede validar correctamente con la contraseña. Se le envía un título, resumen y contenido. Devuelve un JSON con el objeto creado.                                                                                 con la contraseña. Se le envía un título, resumen y contenido. Devuelve un JSON con el objeto                                                                                       creado.
DELETE /api/v1/publicaciones/<id>?email=<email>&contrasena=<contrasena>	|         Elimina la publicación si las credenciales son correctas y la publicación le pertenece al usuario.
