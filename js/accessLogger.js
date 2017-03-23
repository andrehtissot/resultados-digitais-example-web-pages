'use strict';
var AccessLogger = (function(){
  var _namespace = 'AccessLogger::', _targetAddress = '',
    _messageId = null,
    sendLog = function() {
    let log = localStorage.getItem(_namespace+'log');
    if(!log) { return; }
    localStorage.removeItem(_namespace+'log');
    if(!_messageId){
      _messageId = localStorage.getItem(_namespace+'messageId');
      if(!_messageId){
        let currentLog = localStorage.getItem(_namespace+'log');
        if(currentLog)
          localStorage.setItem(_namespace+'log', currentLog+';'+log);
        else localStorage.setItem(_namespace+'log', log);
        return;
      }
    }
    let params = 'log='+encodeURI(log)+'&messageId='+encodeURI(_messageId);
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
    setMessageId: function(messageId){
      _messageId = messageId;
      localStorage.setItem(_namespace+'messageId', messageId);
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
})();