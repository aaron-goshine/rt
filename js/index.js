/**
 * Created by aaron.goshine on 19/02/15.
 */
// datepart: 'y', 'm', 'w', 'd', 'h', 'n', 's'

var dateDiff = function (datepart, fromdate, todate) {
  datepart = datepart.toLowerCase();
  var diff = todate - fromdate;
  var divideBy = {
    'w': 604800000,
    'd': 86400000,
    'h': 3600000,
    'm': 60000,
    's': 1000
  };
  return Math.floor(diff / divideBy[datepart]);
};

var getData = function (path, cb) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      cb(JSON.parse(this.responseText));
    }
  };
  xhttp.open('GET', path, true);
  xhttp.send();
};

var dataHandler = function (responseData) {
  for (var proj in responseData) {
    if (proj === 'end') continue;
    var data = responseData[proj];
    for (var i = 0; i < data.length; i++) {
      var reltime = new Date(data[i].time);
      var now = Date.now();
      var elaspe = dateDiff('m', reltime, now);
      if (elaspe < 60) {
        document.getElementById(data[i].name).innerHTML = elaspe + ' mins ago';
      } else if (elaspe > 60 && elaspe < (60 * 24)) {
        document.getElementById(data[i].name).innerHTML = Math.ceil(elaspe / 60) + ' hours ago';
      } else {
        document.getElementById(data[i].name).innerHTML = Math.ceil(elaspe / (60 * 24)) + ' days ago';
      }
    }
  }
};

var interval = function () {
  getData('/raider-release.json', dataHandler);
};

function ready () {
  interval();
  window.setInterval(interval, 1000);
}

window.onload = ready;
