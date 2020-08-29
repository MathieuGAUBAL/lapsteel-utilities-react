const request = require('supertest');
const app = require('../app');
const uri = '/api/videos';
const uri_login_admin = '/api/login@admin';
const admin_email = process.env.ADMIN_EMAIL;
const admin_password = process.env.ADMIN_PASSWORD;


/* 
procédure des tests : 

importation :
request = require('request');

constante:
const uri = 'adresse complete de la route à tester'

description du test:
- describe
- creation d'un objet pour les tests
- it + description du test + ajout de 'done'
- on precise la methode qui va etre utiliser
- expect qui précise ce qui est attendu 

*/

describe('CRUD route video', () => {

    const obj = {
        id: "",
        tokenAdmin: "",
        image_id: null
    }

    //"Récupération du token Admin"
    beforeAll((done) => {
        request(app)
            .post(uri_login_admin)
            .send({ email: admin_email, password: admin_password })
            .end((err, res) => {
                if (err) {
                    return done(err);
                } else {
                    obj.tokenAdmin = res.body.token;
                    done();
                }
            })
    });

    test('devrait retourner status code : 200 (POST) et la propriete url correcte', (done) => {

        request(app)
            .post(uri)
            .set({ 'authorization': 'Bearer ' + obj.tokenAdmin })
            .send({ url: "https://www.google.com/videos", rubrique:"google website"})
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    return done(err);
                } else {
                    expect(res.body[0].url).toBe("https://www.google.com/videos");
                    expect(res.body[0].rubrique).toBe("google website");
                    expect(res.status).toBe(200);
                    done();
                }

            });
    });

    test('devrait retourner status code : 422 (POST) si pas d\'url envoyé', (done) => {
        request(app)
            .post(uri)
            .set({ 'authorization': 'Bearer ' + obj.tokenAdmin })
            .send({})
            .expect(422)
            .expect('content-type', /json/)
            .then(response => {
                const expected = { "error": "required field(s) missing" };
                expect(response.body).toEqual(expected);
                done();
            });
    });

    test('devrait retourner le status code 200 pour la méthode (GET)', (done) => {
        return request(app).get(uri).then(response => {
            expect(response.statusCode).toBe(200);

            let array = (JSON.parse(response.text));
            if (array.length !== 0) {
                obj.id = array[array.length - 1].id
            } else {
                obj.id = 1;
            }
            done();
        })
    });

    test('devrait retourner status code : 200 (GET) avec l\'id correct ', (done) => {
        request(app)
            .get(uri + `/${obj.id}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    return done(err);
                } else {
                    expect(res.body[0].id).toBe(obj.id);
                    expect(res.body[0].url).toBe("https://www.google.com/videos")
                    expect(res.status).toBe(200);
                    done();
                }
            });
    })

    test('devrait retourner status code : 400 (GET) si l\'id n\'existe pas ', (done) => {
        request(app)
            .get(uri + `/${obj.id + 1}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    return done(err);
                } else {
                    const expected = { "message": "Bad Request" };
                    expect(res.body).toEqual(expected);
                    expect(res.status).toBe(400);
                    done();
                }
            });
    })

    test('devrait retourner status code : 200 (PUT) et la propriete url correctement modifiée', (done) => {

        request(app)
            .put(uri + `/${obj.id}`)
            .set({ 'authorization': 'Bearer ' + obj.tokenAdmin })
            .send({ url: "https://www.amazon.com/videos" })
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    return done(err);
                } else {
                    expect(res.request._data.url).toBe("https://www.amazon.com/videos");
                    expect(res.status).toBe(200);
                    done();
                }

            });
    });

    test('devrait retourner status code : 200 (DELETE) et l\'objet par id doit etre supprimé', (done) => {

        request(app)
            .delete(uri + `/${obj.id}`)
            .set({ 'authorization': 'Bearer ' + obj.tokenAdmin })
            .end((err, res) => {
                if (err) {
                    return done(err);
                } else {
                    expect(res.status).toBe(200);
                    done();
                }
            })
    });

    test('devrait retourner status code 400 : (DELETE) si l\'id n\'existe pas', (done) => {
        request(app)
            .delete(uri + `/${obj.id}`)
            .set({ 'authorization': 'Bearer ' + obj.tokenAdmin })
            .end((err, res) => {
                if (err) {
                    return done(err);
                } else {
                    const expected = { "message": "Bad Request" };
                    expect(res.body).toEqual(expected);
                    expect(res.status).toBe(400);
                    done();
                }
            })
    });

});