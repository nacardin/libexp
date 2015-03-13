function Exp(def) {

  var regexString = [];

  this.regexString = regexString;

  var captureGroups = {};

  var captureGroupCount = 0;

  function processComponent(component) {

    var regexStringLocal = [];

    if(component.captureId) {
      regexStringLocal.push('(' + processComponent(component.exp) + ')');
      captureGroupCount++;
      if(component.captureId) {
        captureGroups[component.captureId] = captureGroupCount;
      }
    } else if(component.or) {
      regexStringLocal.push('(');
      component.or.forEach(function(exp) {
        regexStringLocal.push(processComponent(exp));
        regexStringLocal.push('|');
      });
      regexStringLocal.pop();
      regexStringLocal.push(')');
    } else if(component.ref) {
      var backRef = captureGroups[component.ref];
      regexStringLocal.push('\\' + backRef);
    } else {
      regexStringLocal.push(component.string || component.char);
    }

    return regexStringLocal.join('');

  }


  def.forEach(function(component) {
    regexString.push(processComponent(component));
  });

  var regExp = new RegExp(regexString.join(''));

  this.exec = function(string) {
    var regexpResult = regExp.exec(string);

    var result = {
      input: string
    };

    if(regexpResult) {
      resultingCaptureGroups = {};
      result.matchedString = regexpResult[0];

      for(var captureGroup in captureGroups) {
        resultingCaptureGroups[captureGroup] = regexpResult[captureGroups[captureGroup]];
      }

      if(Object.keys(resultingCaptureGroups).length > 0) {
        result.resultingCaptureGroups = resultingCaptureGroups;
      }
    }

    return result;
  };

}

Exp.BEGIN = {
  char: '^'
};

Exp.ANY = {
  char: '.*'
};


Exp.END = {
  char: '$'
};

module.exports = Exp;