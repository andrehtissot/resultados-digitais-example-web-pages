# User Tracking - Example Web Pages


### Description
The JS library was designed to be generic and be reused with multiple instances, separating
collected data with differente namespaces.


### Requirements
* Modern browser. Currently tested on Firefox 52 and Chromium 56.


### Install
No install process necessary.


### Behavior
The libraries `waitPromise.js`, `asyncPost.js`, and `accessLogger.js` are generic and configure in
each page.
Since the contact page changes the `accessLogger.js` core's behavior, from collecting access data to
send it with the identification to the address defined.
