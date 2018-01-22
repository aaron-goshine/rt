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
  var grid = document.getElementById('grid');
  grid.innerHTML = '';
  for (var proj in responseData) {
    if (proj === 'end') continue;
    var data = responseData[proj];
    for (var i = 0; i < data.length - 1; i++) {
      var pt = document.getElementById('paneltpl');
      pt.content.querySelectorAll('h2')[0].textContent = proj;
      pt.content.querySelectorAll('.console')[0].textContent = data[i].rdate;
      pt.content.querySelectorAll('.tags')[0].textContent = data[i].tags;
      pt.content.querySelectorAll('.author')[0].textContent = data[i].author;
      var clone = document.importNode(pt.content, true);
      grid.appendChild(clone);
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
