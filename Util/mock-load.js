var widgetLoadEvent = new CustomEvent('onWidgetLoad',{state: true});

var waitForElement = function(selector, callback) {
    if ($(selector).length) {
      callback();
    } else {
      setTimeout(function() {
        waitForElement(selector, callback);
      }, 100);
    }
  };
  
  waitForElement("main", function() {
    console.log("found main, dispatching load event...")
    window.dispatchEvent(widgetLoadEvent);
  });