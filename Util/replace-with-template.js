function renderTemplate(template, values){
  var rendered = template;
  for(var value in values) {
    rendered = rendered.replace(new RegExp('{'+ value +'}','g'), values[value].value);
  }
  return rendered;
}

function replaceWithTemplate() {
  var elements, i, element, templatePath, templateRequest, template, valuesPath, valuesRequest, values;
  /* Loop through a collection of all HTML elements: */
  elements = document.getElementsByTagName("*");
  for (i = 0; i < elements.length; i++) {
    element = elements[i];
    /*search for elements with a certain atrribute:*/
    templatePath = element.getAttribute("replace-with-template");
    valuesPath = "widget.json"
    if (templatePath) {
      /* Make an HTTP request using the attribute value as the file name: */
      templateRequest = new XMLHttpRequest();
      templateRequest.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            template = this.responseText;
            valuesRequest = new XMLHttpRequest();
            valuesRequest.onreadystatechange = function () {
              if (this.readyState == 4) {
                if (this.status == 200) {
                  values = JSON.parse(this.responseText);
                  element.parentElement.innerHTML = renderTemplate(template,values);
                }
                if (this.status == 404) {
                  element.parentElement.innerHTML = "Values not found.";
                }
              }
            }
            valuesRequest.open("GET", valuesPath, true);
            valuesRequest.send();
            
          }
          if (this.status == 404) {
            element.parentElement.innerHTML = "Template not found.";
          }
          /* Remove the attribute, and call this function once more: */
          element.removeAttribute("replace-with-template");
          replaceWithTemplate();
        }
      };
      templateRequest.open("GET", templatePath, true);
      templateRequest.send();
      /* Exit the function: */
      return;
    }
  }
}
