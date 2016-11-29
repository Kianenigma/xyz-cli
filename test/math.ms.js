var fn = require('./../../xyz-core/test/ms/mock.functions')
var XYZ = require('xyz-core').xyz

var mathMs = new XYZ({
  selfConf: {
    logLevel: 'debug',
    allowJoin: true,
    name: 'MathMs',
    host: '127.0.0.1',
    port: 3333
  },
  systemConf: { microservices: []}
})

mathMs.register('/math/decimal/mul', fn.mul)
mathMs.register('/math/decimal/neg', fn.neg)
mathMs.register('/math/decimal/sub', fn.sub)

mathMs.register('/math/float/neg', function (payload, XResponse) {
  XResponse.send('ok whassssaaaap')
})
