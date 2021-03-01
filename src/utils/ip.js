/**
 * Utilidad para extracción de ip publica.
 */

const os = require('os');
var ifaces = os.networkInterfaces();

var interfaces = [];

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    var name = "";
    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      name = ifname + ':' + alias;
    } else {
      // this interface has only one ipv4 adress
      name = ifname;
    }
    interfaces.push({ name: name, address: iface.address });
    //console.log(name, iface.address);

    ++alias;
  });
});

module.exports.interfaces = interfaces;