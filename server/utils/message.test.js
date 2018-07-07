var expect = require('expect');
var {generateMessages} = require('./message.js');


describe('should generate message',() => {
    it('should return the messages',() => {
        var from = 'basanyash627@gmail.com';
        var text = 'hello bro hii';
        var result = generateMessages(from,text);
            expect(result).toInclude({
                from,
                text
            });
        expect(result.createdAt).toBeA('number');
    });
});