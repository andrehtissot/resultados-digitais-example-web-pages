'use strict';
var AccessLogger = (function(){
  var _sendLogs = false, _namespace = 'AccessLogger::', _targetAddress = '',
    _accessId = null,
    sendLog = function() {
    // if(!_sendLogs) { return; }                                UNCOMMENT THIS!!!
    let log = localStorage.getItem(_namespace+'log');
    localStorage.removeItem(_namespace+'log');
    if(!_accessId){
      _accessId = localStorage.getItem(_namespace+'accessId');
      if(!_accessId){
        _accessId = (new Date().getTime())+(''+Math.random()).replace('.','');
        localStorage.setItem(_namespace+'accessId', _accessId);
      }
    }
    let params = 'log='+encodeURI(log)+'&accessId='+encodeURI(_accessId);
    waitPromise(function(){
      return asyncPost(_targetAddress, params);
    }, 3, 400).then(function(){
      AccessLogger.sendLogsFromNowOn();
    }).catch(function(){
      //Could not send, return to local log to try again next time
      let currentLog = localStorage.getItem(_namespace+'log');
      if(currentLog)
        localStorage.setItem(_namespace+'log', currentLog+';'+log);
      else localStorage.setItem(_namespace+'log', log);
    });
  };
  return {
    setTargetAddress: function(targetAddress){
      _targetAddress = targetAddress;
      return this;
    },
    setNamespace: function(namespace){
      _namespace = namespace;
      return this;
    },
    sendLogsFromNowOn: function(){
      _sendLogs = true;
      sendLog();
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