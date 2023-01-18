# MiniConsole
To use, add this code as bookmark url:
```
javascript: (function () {
    var protocol = window.location.protocol === 'file:' ? 'http:' : '';
    var url = protocol + '//raw.githubusercontent.com/Davilarek/MiniConsole/master/miniconsole.js';
    var n = document.createElement('script');
    n.setAttribute('language', 'JavaScript');
    n.setAttribute('src', url + '?rand=' + new Date().getTime());
    document.body.appendChild(n);
})();
```
