var asyncPost = function(toUrl, params){
  return new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', toUrl);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 200) {
        resolve(xhr.responseText);
      } else if(xhr.status !== 200) {
        reject(xhr);
      }
    }
  });
}
