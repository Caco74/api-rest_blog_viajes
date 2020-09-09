const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

var pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'caco_blog',
    password: '1884',
    database: 'blog_viajes'
})

//          /api/v1/publicaciones
// CURL     curl http://localhost:8080/api/v1/publicaciones

//          /api/v1/publicaciones/?busqueda=<palabra>
// CURL     curl http://localhost:8080/api/v1/publicaciones?busqueda=ro
router.get('/api/v1/publicaciones', (req, res) => {
    pool.getConnection((err, connection) => {
        let consulta
        const busqueda = (req.query.busqueda) ? req.query.busqueda: ''
        if (busqueda != '') {
            consulta = `
                    SELECT * FROM publicaciones WHERE
                    titulo LIKE '%${busqueda}%' OR
                    resumen LIKE '%${busqueda}%' OR
                    contenido LIKE '%${busqueda}%'
        `
        } else {
            if (err) throw err;
            consulta = `SELECT * FROM publicaciones`

        }

        connection.query(consulta, (error, filas, campos) => {
            console.log(consulta);
            if (filas.length > 0) {
                res.json({ data : filas})
            } else {
                res.status(404)
                res.send('Id no encontrada')
            }
        })
        connection.release()
    })
})

//          /api/v1/publicaciones/<id>
// CURL     curl http://localhost:8080/api/v1/publicaciones/15
router.get('/api/v1/publicaciones/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        let consulta = `
            SELECT * FROM publicaciones
            WHERE
            id = ${connection.escape(req.params.id)}
            `
        connection.query(consulta, (error, filas, campos) => {
            if (filas.length > 0) {
                res.json({data: filas[0]})
            } else {
                res.status(404)
                res.send('Id no encontrada')
            }
        })
        connection.release()
    })
})

//          /api/v1/autores
// CURL     curl http://localhost:8080/api/v1/autores
router.get('/api/v1/autores', (req, res) => {
    pool.getConnection((err, connection) => {
        const consulta = `SELECT * FROM autores`
        connection.query(consulta, (err, filas, campos) => {
            if (filas.length > 0) {
                res.json({data: filas})
            } else {
                console.log(err);
                res.status(404)
                res.send('Error al buscar autores.')
            }
        })
        connection.release()
    })
})

//          /api/v1/autores/<id>
//CURL      curl http://localhost:8080/api/v1/autores/1
router.get('/api/v1/autores/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        const consulta = `SELECT * FROM autores
                WHERE id = ${connection.escape(req.params.id)}`
        connection.query(consulta, (err, filas, campos) => {
            if (filas.length > 0) {
                res.json({data: filas[0]})
            } else {
                console.log(err);
                res.status(404)
                res.send('Error al buscar autores.')
            }
        })
        connection.release()
    })
})

router.get('/registro_api', function (req, res) {
    res.render('registro_api', { mensaje: req.flash('mensaje') })
  })

//POST      api/v1/autores
//CURL      curl --data "pseudonimo=CasaRadio&email=radio@gmail.com&contrasena=1884" http://localhost:8080/api/v1/autores
router.post('/api/v1/autores', (req, res) => {
    pool.getConnection((err, connection) => {
        const email = req.body.email
        const pseudonimo = req.body.pseudonimo
        const contrasena = req.body.contrasena

        const consultaEmail = `
                    SELECT *
                    FROM autores
                    WHERE email = ${connection.escape(email)}
                    `
        connection.query(consultaEmail, (error, filas, campos) => {
            if (filas.length > 0) {
                res.status(404)
                res.send('Error, email duplicado')
            } else {
                const consultaPseudonimo = `
                            SELECT *
                            FROM autores
                            WHERE pseudonimo = 
                            ${connection.escape(pseudonimo)}`
                connection.query(consultaPseudonimo, (error, filas, campos) => {
                    if (filas.length > 0) {
                        res.status(404)
                        res.send('Error Pseudonimo')
                    } else {
                        const consulta = `
                                INSERT INTO
                                autores (email, contrasena, pseudonimo)
                                VALUES (
                                    ${connection.escape(email)},
                                    ${connection.escape(contrasena)},
                                    ${connection.escape(pseudonimo)}
                                )`
                        connection.query(consulta, (error, filas, campos) => {
                            if (error) throw error
                            const id = filas.insertId
                            const consulta = `SELECT * FROM autores WHERE id = ${connection.escape(id)}`
                            connection.query(consulta, (error, filas, campos) => {
                                if (filas.length > 0) {
                                    res.status(201)
                                    res.json({data: filas})
                                } else {
                                    console.log(error);
                                    res.status(404)
                                    res.send('Error al crear el autor.')
                                }
                            })
                        })
                    }
                    console.log(error);
                })
            }
        })
        connection.release()
    })
})

// POST     /api/v1/publicaciones?email=<email>&contrasena=<contrasena>
//CURL       curl --data "email=francodemetrio87@gmail.com&contrasena=1884&titulo=curl&resumen=funciona?&contenido=SI" http://localhost:8080/api/v1/publicaciones
router.post('/api/v1/publicaciones', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        let modificadorConsulta = ''
        
        const email = (req.query.email) ? req.query.email : ''
        const contrasena = (req.query.contrasena) ? req.query.contrasena : ''

        if (email != '' &&  contrasena != '') {
            modificadorConsulta = `WHERE email = '${email}' AND contrasena = '${contrasena}'`
            console.log(email);
            console.log(contrasena);
        }
        const consulta = `SELECT id FROM autores ${modificadorConsulta}`
        connection.query(consulta, (error, filas, campos) => {
            if (filas.length > 0) {
                const id = filas[0].id
                const date = new Date()
                const fecha = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                const consulta = `INSERT INTO
                            publicaciones
                            (titulo, resumen, contenido, autor_id, fecha_hora)
                            VALUES
                            (
                                ${connection.escape(req.body.titulo)},
                                ${connection.escape(req.body.resumen)},
                                ${connection.escape(req.body.contenido)},
                                ${connection.escape(id)},
                                ${connection.escape(fecha)}
                            )
                            `
                connection.query(consulta, (error, filas, campos) => {
                    const id = filas.insertId
                    const consulta = `SELECT * FROM 
                            publicaciones
                            WHERE id = ${connection.escape(id)}
                            `
                    connection.query(consulta, (error, filas, campos) => {
                        if (filas.length > 0) {
                            res.json({data : filas[0]})
                        } else {
                            res.status(404)
                            res.send('Error. No se pudo crear la publicación')
                        }
                    })
                })
            } else {
                res.status(404)
                res.send('Combinación de email y contraseña incorrecto.')
            }
        })
        connection.release()
    })
})

//          /api/v1/publicaciones/<id>?email=<email>&contrasena=<contrasena>
//            curl -X DELETE --data "email=ara74@gmail.com&contrasena=1884" http://localhost:8080/api/v1/publicaciones/10
router.delete('/api/v1/publicaciones/:id', (req, res) => {
    
    pool.getConnection((err, connection) => {
        if (err) throw err;
        let modificadorConsulta = ''
        
        const email = (req.body.email) ? req.body.email : ''
        const contrasena = (req.body.contrasena) ? req.body.contrasena : ''

        if (email != '' && contrasena != '') {
            modificadorConsulta = ` WHERE
                        email = '${email}' AND
                        contrasena = '${contrasena}'`
        }
        const consulta = ` SELECT autores.id FROM autores ${modificadorConsulta}`
        connection.query(consulta, (error, filas, campos) => {
            if(filas.length == 0) {
                res.status(404).send('Datos Inválidos. (Correo, contraseña)')
            } else {
                const id_autor = filas[0].id
                const consulta = `SELECT * FROM publicaciones
                        WHERE id = ${connection.escape(req.params.id)}
                        AND autor_id = ${connection.escape(id_autor)}`
                        connection.query(consulta, (error, filas, campos) => {
                            if(filas.length > 0) {
                                const consulta = `DELETE FROM publicaciones WHERE
                                id = ${connection.escape(req.params.id)}
                                AND
                                autor_id = ${connection.escape(id_autor)}`
                                connection.query(consulta, (error, filas, campos) => {
                                    if(filas && filas.affectedRows > 0) {
                                        res.status(200).send('Publicación Eliminada')
                                    } else {
                                        res.status(404).send('Publicación no eliminada.')
                                    }
                                })
                            } else {
                                res.status(404).send('Error, publicación no encontrada.')
                            }
                        })

            }
        })
        connection.release()
    })
})

module.exports = router