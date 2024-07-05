function renderTemplate(string, obj){
    var s = string;
    for(var prop in obj) {
      s = s.replace(new RegExp('{'+ prop +'}','g'), obj[prop]);
    }
    return s;
  }
  
  renderTemplate('/task/{module}?taskId={taskId}#{hash}', {
    module: 'foo', 
    taskId: 2, 
    hash: 'bar'
  });