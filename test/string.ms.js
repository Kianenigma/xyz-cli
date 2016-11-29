var fn = require('./../../xyz-core/test/ms/mock.functions')
var XYZ = require('xyz-core').xyz

var stringMs = new XYZ({
  selfConf: {
    logLevel: 'debug',
    seed: ['127.0.0.1:3333'],
    name: 'stringMs',
    host: '127.0.0.1',
    port: 3334
  },
  systemConf: {
    microservices: []
  }
})

stringMs.register('/string/down', fn.down)
stringMs.register('/string/up', fn.up)
stringMs.register('/finger', fn.finger)

setInterval(() => {
  stringMs.call('/math/decimal/*', { x: new Date().getTime(), y: new Date().getTime() }, (err, body, res) => {
    console.log('response of decimal/*', body)
  })
}, 1000)
