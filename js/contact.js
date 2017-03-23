AccessLogger.setTargetAddress('http://andretissot.com/log').visit('Contato');
document.getElementById('contactForm').addEventListener("submit", function(event){
  event.preventDefault();
  let params = '', contactEmail = document.getElementById('contactEmail').value;
  for(let i=0; i<this.elements.length; i++)
    if(this.elements[i].name && this.elements[i].value)
      params += this.elements[i].name+'='+encodeURI(this.elements[i].value)+'&';
  params = params.substr(0, params.length-1);
  waitPromise(function(){
    return asyncPost('http://andretissot.com/contact', params);
  }, 3, 400).then(function(){
    AccessLogger.sendLogsFromNowOn();
  }).catch(function(){
    //Nothing yet
  });
});