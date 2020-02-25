const request = require("request");
const server = require('../server');
const uri = 'http://localhost:5000/videos';



describe('CRUD route video', () => {
    const video = {
        url:"https://www.google.com/videos"
    }

    it('devrait retourner un code de status 200', (done)=> {
        request.get(uri, (error, response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    

});