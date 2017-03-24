'use strict';
var AccessLogger = (function(){
  var _namespace = 'AccessLogger::', _targetAddress = '', _sessionId = null,
    sendLog = function() {
    let log = localStorage.getItem(_namespace+'log');
    if(!log) { return; }
    localStorage.removeItem(_namespace+'log');
    if(!_sessionId){
      _sessionId = localStorage.getItem(_namespace+'sessionId');
      if(!_sessionId){
        let currentLog = localStorage.getItem(_namespace+'log');
        if(currentLog)
          localStorage.setItem(_namespace+'log', currentLog+';'+log);
        else localStorage.setItem(_namespace+'log', log);
        return;
      }
    }
    let params = 'log='+encodeURI(log)+'&'+_sessionId;
    waitPromise(function(){
      return asyncPost(_targetAddress, params);
    }, 3, 400).catch(function(){
      //Could not send, return to local log to try again next time
      let currentLog = localStorage.getItem(_namespace+'log');
      if(currentLog)
        localStorage.setItem(_namespace+'log', currentLog+';'+log);
      else localStorage.setItem(_namespace+'log', log);
    });
  };
  return {
    setSessionId: function(sessionId){
      _sessionId = sessionId;
      localStorage.setItem(_namespace+'sessionId', sessionId);
      sendLog();
      return this;
    },
    setTargetAddress: function(targetAddress){
      _targetAddress = targetAddress;
      return this;
    },
    setNamespace: function(namespace){
      _namespace = namespace;
      return this;
    },
    visit: function(pageName){
      let toLog = pageName+';'+(new Date().getTime())+';'+location.href,
        log = localStorage.getItem(_namespace+'log');
      if(log)
        localStorage.setItem(_namespace+'log', log+';'+toLog);
      else localStorage.setItem(_namespace+'log', toLog);
      sendLog();
      return this;
    }
  };
});