const request = require('supertest');
const app = require('../app');
const uri = '/api/videos';



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
        id:""
    }

    test('devrait retourner status code : 200 (POST) et la propriete url correcte', (done) => {
       
        request(app)
            .post(uri)
            .send({url: "https://www.google.com/videos"})
            .set('Accept', 'application/json')
            .end((err,res) => {
                if(err){
                    return done (err);
                }else{
                    expect(res.body[0].url).toBe("https://www.google.com/videos");
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
                    expect(res.body[0].url).toBe("https://www.google.com/videos")
                    expect(res.status).toBe(200);
                    done();
                }
            });
        })
   
    test('devrait retourner status code : 200 (PUT) et la propriete url correctement modifiée', (done) => {

        request(app)
            .put(uri + `/${obj.id}`)
            .send({url: "https://www.amazon.com/videos"})
            .set('Accept', 'application/json')
            .end((err,res) => {
                if(err){
                    return done (err);
                }else{
                    expect(res.request._data.url).toBe("https://www.amazon.com/videos");
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