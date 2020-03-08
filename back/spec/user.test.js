const request = require('supertest');
const app = require('../app');
const uri = '/api/user';
const uri_login_user = '/api/login/user';
const uri_login_admin = '/api/login@admin';
const bcrypt_secret = process.env.BCRYPT_SECRET;
const bcrypt_secret_modified = process.env.BCRYPT_SECRET_MODIFIED;
const bcrypt = require('bcryptjs');
const user_email = process.env.USER_EMAIL;
const user_password = process.env.USER_PASSWORD;


describe('CRUD route user', () => {
   
    const obj = {
        id:"",
        passwordIsCorrect:false,
        tokenAdmin:"",
        token:""
    }

    const user = {
        email:user_email,
        password:user_password
    }

    //"Récupération du token Admin"
    beforeAll((done) => {
        request(app)
        .post(uri_login_admin)
        .send({email:user.email, password:user.password})
        .end((err, res) => {
            if(err){
                return done (err);
            }else{
                obj.tokenAdmin = res.body.token;
    
               done();
            
            }
        })
    
    });

    //"Récupération du token User"
    beforeAll((done) => {
        request(app)
        .post(uri_login_user)
        .send({email:user.email, password:user.password})
        .end((err, res) => {
            if(err){
                return done (err);
            }else{
                obj.token = res.body.token;

                done()
        
            }
        });
    })



    test('devrait retourner status code : 200 (POST) et la propriete url correcte', (done) => {
        request(app)
            .post(uri)
            .set({'authorization':'Bearer ' + obj.tokenAdmin})
            .send({
                email:"test@test.com",
                password:bcrypt_secret,
                pays:"france"
            })
            .end((err, res) => {
                if(err){
                    return done (err);
                }else{
            
                    obj.passwordIsCorrect = bcrypt.compareSync(`${bcrypt_secret}`, res.body[0].password);
                    expect(obj.passwordIsCorrect).toBe(true);
                    expect(res.body[0].email).toBe("test@test.com");
                    expect(res.body[0].pays).toBe("france");
                    expect(res.status).toBe(200);
                    done();
                }
            });
    });

    test('devrait retourner status code : 400 (POST) s\'il manque une ou plusieurs entree', (done) => {
        request(app)
            .post(uri)
            .set({'authorization':'Bearer ' + obj.tokenAdmin})
            .send({
                email:"",
                password:bcrypt_secret,
                pays:"france"
            })
            .then(response => {
                const expected = {"error": "required field(s) missing"};
                expect(response.body).toEqual(expected);
            });
           done();
    });

    test('devrait retourner le status code 200 pour la méthode (GET)', (done) => {
        return request(app)
            .get(uri)
            .set({'authorization':'Bearer ' + obj.tokenAdmin})
            .then(response => {
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
            .set({'authorization':'Bearer ' + obj.tokenAdmin})
            .end((err,res) => {
                if(err){
                    return done (err);
                }else{
                    expect(res.body[0].id).toBe(obj.id);
                    expect(res.body[0].email).toBe("test@test.com");
                    obj.passwordIsCorrect = bcrypt.compareSync(`${bcrypt_secret}`, res.body[0].password);
                    expect(obj.passwordIsCorrect).toBe(true);
                    expect(res.body[0].pays).toBe("france");
                    expect(res.status).toBe(200);
                    done();
                }
            });
        })
 
    test('devrait retourner status code : 200 (PUT) et la propriete url correctement modifiée', (done) => {

        request(app)
            .put(uri + `/${obj.id}`)
            .set({'authorization':'Bearer ' + obj.token})
            .send({email:"email_modifie@test.fr", password: `${bcrypt_secret_modified}`, pays:"allemagne"})
            .set('Accept', 'application/json')
            .end((err,res) => {
                if(err){
                    return done (err);
                }else{
                    expect(res.request._data.email).toBe("email_modifie@test.fr");
                    obj.passwordIsCorrect = bcrypt.compareSync(`${bcrypt_secret_modified}`, res.body[0].password);
                    expect(obj.passwordIsCorrect).toBe(true);
                    expect(res.request._data.pays).toBe("allemagne");
                    expect(res.status).toBe(200);
                    done();
                }
                
            });
        });


     test('devrait retourner status code : 200 (DELETE) et la l\'objet par id doit etre supprimé', (done) => {

        request(app)
            .delete(uri + `/${obj.id}`)
            .set({'authorization':'Bearer ' + obj.tokenAdmin})
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