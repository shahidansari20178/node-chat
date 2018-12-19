const expect=require('expect');
const {generateMessage}=require('./message');

describe('geneate Message',()=>
{
    it('should return message',()=>
    {
        var from="shahid";   
        var text="hi Everyone";
        var message=generateMessage(from,text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    });    
});