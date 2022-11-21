describe('Sample xxx codes', function () {
    it('xxx codes', function ()  {
        cy.request({ //get request
        method : 'GET',
        url: "http://smsgwtst-cro-app-01.it.tpgtelecom.com.au:8211/api/v1/messages?direction=MT&&sort=created,desc",
        auth: {
            'user': 'accc',
            'pass': 'password'
        }
        })   
        .then((response) => {
            var mobilenumber =  response.body.content[0].to
            const changeprefix = mobilenumber.replace(mobilenumber.substring(0,3), '0')
            const encryptnumber = changeprefix.replace(changeprefix.substring(2,7), 'XX XXX ')
            cy.wrap(encryptnumber)
            
        })        
    })  
})
