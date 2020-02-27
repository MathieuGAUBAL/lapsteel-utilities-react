const request = require('supertest');
const app = require('../app');
const uri = '/api/user';

describe('CRUD route user', () => {
   
    const obj = {
        id:""
    }

    test('devrait retourner status code : 200 (POST) et la propriete url correcte', (done) => {
        request(app)
            .post(uri)
            .send({
                email:"test@test.com",
                password:"password1!",
                pays:"france"
            })
            .end((err, res) => {
                if(err){
                    return done (err);
                }else{
                    expect(res.body[0].email).toBe("test@test.com");
                    expect(res.body[0].password).toBe("password1!");
                    expect(res.body[0].pays).toBe("france");
                    expect(res.status).toBe(200);
                    done();
                }
            });
    });

    test('devrait retourner le status code 200 pour la méthode (GET)', (done) => {
        return request(app).get(uri).then(response => {
            expect(response.statusCode).toBe(200);
            let array = (JSON.parse(response.text));
            if(array.length !== 0){
                obj.id = array[array.length - 1].id
            }else{
                obj.id = 1;
            }
            done();
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
                    expect(res.body[0].email).toBe("test@test.com");
                    expect(res.body[0].password).toBe("password1!");
                    expect(res.body[0].pays).toBe("france");
                    expect(res.status).toBe(200);
                    done();
                }
            });
        })

    test('devrait retourner status code : 200 (PUT) et la propriete url correctement modifiée', (done) => {

        request(app)
            .put(uri + `/${obj.id}`)
            .send({email:"email_modifie@test.fr", password: "MDPmodifie", pays:"allemagne"})
            .set('Accept', 'application/json')
            .end((err,res) => {
                if(err){
                    return done (err);
                }else{
                    expect(res.request._data.email).toBe("email_modifie@test.fr");
                    expect(res.request._data.password).toBe("MDPmodifie");
                    expect(res.request._data.pays).toBe("allemagne");
                    expect(res.status).toBe(200);
                    done();
                }
                
            });
        });

    test('devrait retourner status code : 200 (DELETE) et la l\'objet par id doit etre supprimé', (done) => {

        request(app)
            .delete(uri + `/${obj.id}`)
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