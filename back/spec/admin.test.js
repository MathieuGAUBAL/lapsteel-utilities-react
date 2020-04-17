const request = require('supertest');
const app = require('../app');
const uri = '/api/admin';
const uri_login = '/api/login@admin';
const bcrypt = require('bcryptjs');
const bcrypt_secret = process.env.BCRYPT_SECRET;
const bcrypt_secret_modified = process.env.BCRYPT_SECRET_MODIFIED;
const admin_email = process.env.ADMIN_EMAIL;
const admin_password = process.env.ADMIN_PASSWORD;


describe('CRUD route admin', () => {
   
    const obj = {
        id:"",
        passwordIsCorrect:false,
        token:""
    }

    const admin = {
        email:admin_email,
        password:admin_password
    }

    beforeAll((done) => {
        request(app)
            .post(uri_login)
            .send({email:admin.email, password:admin.password})
            .end((err, res) => {
                if(err){
                    return done (err);
                }else{
                    obj.token = res.body.token;
                   
                    done();
                }
            });
    });
  
    test('devrait retourner status code : 200 (POST) et la propriete url correcte', (done) => {
        request(app)
            .post(uri)
            .set({'authorization':'Bearer ' + obj.token})
            .send({
                email:"test@test.com",
                password:bcrypt_secret,
            })
            .end((err, res) => {
                if(err){
                    return done (err);
                }else{
                    
                    obj.passwordIsCorrect = bcrypt.compareSync(`${bcrypt_secret}`, res.body[0].password);
                    expect(res.body[0].email).toBe("test@test.com");
                    expect(obj.passwordIsCorrect).toBe(true);
                    expect(res.status).toBe(200);
                    done();
                }
            });
    });

    test('devrait retourner le status code 200 pour la méthode (GET)', (done) => {
        return request(app)
        .get(uri)
        .set({'authorization':'Bearer ' + obj.token})
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
            .set({'authorization':'Bearer ' + obj.token})
            .set('Accept', 'application/json')
            .end((err,res) => {
                if(err){
                    return done (err);
                }else{
                    expect(res.body[0].id).toBe(obj.id);
                    obj.passwordIsCorrect = bcrypt.compareSync(`${bcrypt_secret}`, res.body[0].password);
                    expect(res.body[0].email).toBe("test@test.com");
                    expect(obj.passwordIsCorrect).toBe(true);
                    expect(res.status).toBe(200);
                    done();
                }
            });
        })

   test('devrait retourner status code : 200 (PUT) et la propriete url correctement modifiée', (done) => {

        request(app)
            .put(uri + `/${obj.id}`)
            .set({'authorization':'Bearer ' + obj.token})
            .send({email:"email_modifie@test.fr", password: `${bcrypt_secret_modified}`})
            .set('Accept', 'application/json')
            .end((err,res) => {
                if(err){
                    return done (err);
                }else{
                    obj.passwordIsCorrect = bcrypt.compareSync(`${bcrypt_secret_modified}`, res.body[0].password);
                    expect(res.request._data.email).toBe("email_modifie@test.fr");
                    expect(obj.passwordIsCorrect).toBe(true);
                    expect(res.status).toBe(200);
                    done();
                }
                
            });
        });

   test('devrait retourner status code : 200 (DELETE) et la l\'objet par id doit etre supprimé', (done) => {

        request(app)
            .delete(uri + `/${obj.id}`)
            .set({'authorization':'Bearer ' + obj.token})
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