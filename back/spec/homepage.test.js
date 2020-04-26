const request = require('supertest');
const app = require('../app');
const uri = '/api/homepage';
const uri_login_admin = '/api/login@admin';
const admin_email = process.env.ADMIN_EMAIL;
const admin_password = process.env.ADMIN_PASSWORD;

describe('CRUD route homepage', () => {
   
    const obj = {
        id:"",
        tokenAdmin:"",
    }

        //"Récupération du token Admin"
        beforeAll((done) => {
            request(app)
            .post(uri_login_admin)
            .send({email:admin_email, password:admin_password})
            .end((err, res) => {
                if(err){
                    return done (err);
                }else{
                    obj.tokenAdmin = res.body.token;
        
                   done();
                
                }
            })
        
        });

    test('devrait retourner status code : 200 (POST) et la propriete url correcte', (done) => {
        request(app)
            .post(uri)
            .set({'authorization':'Bearer ' + obj.tokenAdmin})
            .send({
                title:"test@test.com",
                subtitle:"subtitle1!",
                description:"france",
                section:"homepage",
                image_id:1
            })
            .end((err, res) => {
                if(err){
                    return done (err);
                }else{
                    expect(res.body[0].title).toBe("test@test.com");
                    expect(res.body[0].subtitle).toBe("subtitle1!");
                    expect(res.body[0].description).toBe("france");
                    expect(res.body[0].section).toBe("homepage");
                    expect(res.body[0].image_id).toBe(1);
                    expect(res.status).toBe(200);
                    done();
                }
            });
    });

    test('devrait retourner le status code 200 pour la méthode (GET)', (done) => {
        return request(app).get(uri+'/all').then(response => {
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
                    expect(res.body[0].title).toBe("test@test.com");
                    expect(res.body[0].subtitle).toBe("subtitle1!");
                    expect(res.body[0].description).toBe("france");
                    expect(res.body[0].section).toBe("homepage");
                    expect(res.body[0].image_id).toBe(1);
                    expect(res.status).toBe(200);
                    done();
                }
            });
        })

    test('devrait retourner status code : 200 (PUT) et la propriete url correctement modifiée', (done) => {

        request(app)
            .put(uri + `/${obj.id}`)
            .set({'authorization':'Bearer ' + obj.tokenAdmin})
            .send({title:"title_modifie@test.fr", subtitle: "MDPmodifie", description:"allemagne", section: "MDPmodifie-homepage", image_id:6})
            .set('Accept', 'application/json')
            .end((err,res) => {
                if(err){
                    return done (err);
                }else{
                    expect(res.request._data.title).toBe("title_modifie@test.fr");
                    expect(res.request._data.subtitle).toBe("MDPmodifie");
                    expect(res.request._data.description).toBe("allemagne");
                    expect(res.request._data.section).toBe("MDPmodifie-homepage");
                    expect(res.request._data.image_id).toBe(6);
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