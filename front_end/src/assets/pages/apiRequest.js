
const apiRequest = async (url='',  optionObj=null, errMsg=null)=> {

    try {
  
        const response = await fetch(url, optionObj);

        if(!response.ok) console.log('Error accessing the webservice api to login'); 
        const data = await response.json();
        
        if ( typeof data === 'object' ) {
            return data;
        }
        
       
    } catch(err){
        console.log('error ' + err.stack);
       

    } finally {
        console.log('done processing ');
    } 

}

export default apiRequest