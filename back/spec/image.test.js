const request = require('supertest');
const app = require('../app');
const uri = '/api/image';
const uri_login_admin = '/api/login@admin';
const admin_email = process.env.ADMIN_EMAIL;
const admin_password = process.env.ADMIN_PASSWORD;

describe('CRUD route image', () => {
   
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
            .send({
                name:"image 1",
                url:"url image 1",
                alt:"alt image 1"
            })
            .end((err, res) => {
                if(err){
                    return done (err);
                }else{
                    obj.image_id = res.body[0].id;
                    expect(res.body[0].name).toBe("image 1");
                    expect(res.body[0].url).toBe("url image 1");
                    expect(res.body[0].alt).toBe("alt image 1");
                    expect(res.status).toBe(200);
                    done();
                }
            });
    });

    test('devrait retourner le status code 200 pour la méthode (GET)', (done) => {
        return request(app).get(uri).then(response => {
            expect(response.status).toBe(200);
            done();
            let array = (JSON.parse(response.text));
            if(array.length !== 0){
                obj.id = array[array.length - 1].id
            }else{
                obj.id = 1;
            }
        })
    });

    test('devrait retourner status code : 200 (GET) avec l\'id correct ', (done) => {
        request(app)
            .get(uri + `/${obj.id}`)
            .set('Accept', 'application/json')
            .end((err,res) => {
                if(err){
                    return done (err);
                }else{
                    expect(res.body[0].id).toBe(obj.id);
                    expect(res.body[0].name).toBe("image 1");
                    expect(res.body[0].url).toBe("url image 1")
                    expect(res.body[0].alt).toBe("alt image 1")
                    expect(res.status).toBe(200);
                    done();
                }
            });
        })

    test('devrait retourner status code : 200 (PUT) et la propriete url correctement modifiée', (done) => {

        request(app)
            .put(uri + `/${obj.id}`)
            .set({ 'authorization': 'Bearer ' + obj.tokenAdmin })
            .send({name:"Mon image modifié", url: "https://www.amazon.com/image", alt:"alt modifié"})
            .set('Accept', 'application/json')
            .end((err,res) => {
                if(err){
                    return done (err);
                }else{
                    expect(res.request._data.name).toBe("Mon image modifié");
                    expect(res.request._data.url).toBe("https://www.amazon.com/image");
                    expect(res.request._data.alt).toBe("alt modifié");
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
                if(err){
                    return done (err);
                }else{
                    expect(res.status).toBe(200);
                    done();
            }
        })
    });
    
});