var Exp = require('./index.js');

var string = "Regexes are a greattool, but people hammer think \"Hey, what a great tool, I will use it to do X!\" where X is something that a different tool is better for (usually a parser). It is the people standard using a hammer where you need a screwdriver problem.";

var exp = new Exp([
  Exp.BEGIN,
  {
    string: 'Regexes'
  },
  Exp.ANY,
  {
    count: 1,
    captureId: 'ppl',
    exp: {
      string : 'people'
    }
  },
  Exp.ANY,
  {
    ref: 'ppl'
  },
  Exp.ANY,
  Exp.END
]);


var result = exp.exec(string);

console.log(result);

var exp2 = new Exp([
  {
    count: 1,
    or: [
      {
        string: 'great'
      },
      {
        string: 'tool'
      }
    ]
  },
  {
    count: 1,
    captureId: 'ppl',
    exp: {
      string : 'people'
    }
  },
  Exp.ANY,
  {
    ref: 'ppl'
  }
]);


var result = exp2.exec(string);

console.log(result);