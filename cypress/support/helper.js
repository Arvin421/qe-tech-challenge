class helper {
    get2facode(){
        let getotp = ' '
        return cy.request({ //get request
            method : 'GET',
            url: "http://smsgwtst-cro-app-01.it.tpgtelecom.com.au:8211/api/v1/messages?direction=MT&&sort=created,desc",
            auth: {
                'user': 'accc',
                'pass': 'password'
            }
        })   
        .then((response) => {
            const Mfacodes =  response.body.content[0].body
            const brand = response.body.content[0].from
            
            //const brandNumber = ["13 22 58", "1300 786 068", "1300 788 233"]           
            if (brand == "iiNet"){
                const replaceotp = Mfacodes.replace(brand + ': Never share this code with anyone. If someone contacted you requesting this code, do not give it to them. To log in to your iiNet account, please use the code: ','')
                getotp = replaceotp.replace('. If you did not request this code, please call us on 13 22 58.','')    
            }
            else if (brand == 'Westnet'){
                const replaceotp = Mfacodes.replace(brand + ': Never share this code with anyone. If someone contacted you requesting this code, do not give it to them. To log in to your iiNet account, please use the code: ','')
                getotp = replaceotp.replace('. If you did not request this code, please call us on 1300 786 068.','')
            }
            else if (brand == 'Internode'){
                const replaceotp = Mfacodes.replace(brand + ': Never share this code with anyone. If someone contacted you requesting this code, do not give it to them. To log in to your iiNet account, please use the code: ','')
                getotp = replaceotp.replace('. If you did not request this code, please call us on 1300 788 233.','')          
            }
            else{
                cy.log("Invalid OTP")
            } 
            
            return cy.wrap(getotp)
        })  
    }
        getnumber(){
        let encryptednumber = ' '
        return cy.request({ //get request
            method : 'GET',
            url: "http://smsgwtst-cro-app-01.it.tpgtelecom.com.au:8211/api/v1/messages?direction=MT&&sort=created,desc",
            auth: {
                'user': 'accc',
                'pass': 'password'
            }
        })   
        .then((response) => {
            const mobilenumber =  response.body.content[0].to
            const replaceprefix = mobilenumber.replace('+61','0')
            const encryptednumber = replaceprefix.eq(3).replace('')
            getotp = replaceotp.replace('. If you did not request this code, please call us on 13 22 58.','')    
            invoke
          
            if (brand == "iiNet"){
                const replaceotp = mobilenumber.replace(brand + ': Never share this code with anyone. If someone contacted you requesting this code, do not give it to them. To log in to your iiNet account, please use the code: ','')
                getotp = replaceotp.replace('. If you did not request this code, please call us on 13 22 58.','')    
            }
            else if (brand == 'Westnet'){
                const replaceotp = Mfacodes.replace(brand + ': Never share this code with anyone. If someone contacted you requesting this code, do not give it to them. To log in to your iiNet account, please use the code: ','')
                getotp = replaceotp.replace('. If you did not request this code, please call us on 1300 786 068.','')
            }
            else if (brand == 'Internode'){
                const replaceotp = Mfacodes.replace(brand + ': Never share this code with anyone. If someone contacted you requesting this code, do not give it to them. To log in to your iiNet account, please use the code: ','')
                getotp = replaceotp.replace('. If you did not request this code, please call us on 1300 788 233.','')          
            }
            else{
                cy.log("Invalid OTP")
            } 
            
            return cy.wrap(encryptednumber)
        })  
    }
}
export default helper