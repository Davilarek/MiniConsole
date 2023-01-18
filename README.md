# MiniConsole
To use, add this code as bookmark url:
```
javascript: (function () {
    var protocol = window.location.protocol === 'file:' ? 'http:' : '';
    var url = protocol + '//raw.githubusercontent.com/Davilarek/MiniConsole/master/miniconsole.js';
    fetch(url)
    .then((res) => res.text()
    .then((t) => {
        var n = document.createElement('script');
        n.setAttribute('language', 'JavaScript');
        n.innerHTML = t;
        document.body.appendChild(n);
    }))
})();
```
