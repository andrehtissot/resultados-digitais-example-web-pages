AccessLogger.setTargetAddress('https://resultados-digitais-log-server.herokuapp.com/log_visit/create.json').visit('Contato');
document.getElementById('contactForm').addEventListener("submit", function(event){
  event.preventDefault();
  let params = '', contactEmail = document.getElementById('contactEmail').value;
  for(let i=0; i<this.elements.length; i++)
    if(this.elements[i].name && this.elements[i].value)
      params += this.elements[i].name+'='+encodeURI(this.elements[i].value)+'&';
  params = params.substr(0, params.length-1);
  waitPromise(function(){
    return asyncPost('https://resultados-digitais-log-server.herokuapp.com/contacts.json', params);
  }, 3, 400).then(function(response){
    AccessLogger.setMessageId(JSON.parse(response).messageId);
  }).catch(function(){
    //Nothing yet
  });
});