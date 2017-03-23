/*!
 * Generic wait until something happen function v1.0-promise
 * https://github.com/andrehtissot/js-wait-until
 *
 * Requires Promise Support
 *
 * Copyright André Augusto Tissot
 * Released under the MIT license
 *
 * Date: 2017-03-22
 */
var waitPromise = function(testPromise, tries, timeBetweenTries){
  var tries = tries || -1, timeBetweenTries = timeBetweenTries || 100;
  return new Promise(function(resolve, reject){
    var test = function(){
      testPromise().then(resolve).catch(function(error){
        if(--tries === 0)
          reject(error);
        else setTimeout(test, timeBetweenTries);
      });
    }
    test();
  });
}
