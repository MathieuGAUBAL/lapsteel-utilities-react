const request = require('supertest');
const app = require('../app');
const uri = '/api/homepage_card';
const uri_login_admin = '/api/login@admin';
const admin_email = process.env.ADMIN_EMAIL;
const admin_password = process.env.ADMIN_PASSWORD;

describe('CRUD route homepage_card', () => {

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

    beforeAll((done) => {
        request(app)
            .post("/api/image")
            .set({ 'authorization': 'Bearer ' + obj.tokenAdmin })
            .send({ name: "test", url: "test", alt: "test" })
            .end((err, res) => {
                if (err) {
                    return done(err);
                } else {
                    obj.image_id = res.body[0].id;
                    done();
                }
            })
    })

    test('devrait retourner status code : 200 (POST) et la propriete url correcte', (done) => {
        request(app)
            .post(uri)
            .set({ 'authorization': 'Bearer ' + obj.tokenAdmin })
            .send({
                title: "test@test.com",
                subtitle: "subtitle1!",
                description: "france",
                image_id: obj.image_id,
                isActived: 1
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                } else {
                    
                    expect(res.body[0].title).toBe("test@test.com");
                    expect(res.body[0].subtitle).toBe("subtitle1!");
                    expect(res.body[0].description).toBe("france");
                    expect(res.body[0].image_id).toBe(obj.image_id);
                    expect(res.body[0].isActived).toBe(1);
                    expect(res.status).toBe(200);
                    done();
                }
            });
    });

    test('devrait retourner le status code 200 pour la méthode (GET)', (done) => {
        return request(app).get(uri + '/all').then(response => {
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
                    expect(res.body[0].title).toBe("test@test.com");
                    expect(res.body[0].subtitle).toBe("subtitle1!");
                    expect(res.body[0].description).toBe("france");
                    expect(res.body[0].image_id).toBe(obj.image_id);
                    expect(res.body[0].isActived).toBe(1);
                    expect(res.status).toBe(200);
                    done();
                }
            });
    })

    test('devrait retourner status code : 200 (PUT) et la propriete url correctement modifiée', (done) => {
        let data = { title: "title_modifie@test.fr", subtitle: "MDPmodifie", description: "allemagne", image_id: obj.image_id, isActived: 0 };
        request(app)
            .put(uri + `/${obj.id}`)
            .set({ 'authorization': 'Bearer ' + obj.tokenAdmin })
            .send(data)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    return done(err);
                } else {

                    expect(res.body[0].title).toBe("title_modifie@test.fr");
                    expect(res.body[0].subtitle).toBe("MDPmodifie");
                    expect(res.body[0].description).toBe("allemagne");
                    expect(res.body[0].image_id).toBe(obj.image_id);
                    expect(res.body[0].isActived).toBe(0);
                    expect(res.status).toBe(200);
                    done();
                }

            });
    });

    test('devrait retourner status code : 200 (DELETE) et la l\'objet par id doit etre supprimé', (done) => {

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

    test('devrait retourner status code : 200 (DELETE) et la l\'objet par id doit etre supprimé', (done) => {

        request(app)
            .delete(`/api/image/${obj.image_id}`)
            .set({ 'authorization': 'Bearer ' + obj.tokenAdmin })
            .end((err, res) => {
                if(err){
                    return done (err);
                }else{
                    expect(res.status).toBe(200);
                    done();
            }
        })
    });
});