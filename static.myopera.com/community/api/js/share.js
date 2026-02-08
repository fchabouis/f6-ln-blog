(function() {
    function share () {
        var links = document.getElementsByClassName('myo-share');

        for (var i = 0, l = links.length; i < l; i++) {
            links.item(i).href="http://my.opera.com/community/post/?url=" + encodeURIComponent(document.location.href) + "&title=" + encodeURIComponent(document.title) + "&type=sharebutton";
            links.item(i).onclick="window.open(this.href, 'test', 'location=0,menubar=0,scrollbars=1,status=0,titlebar=0,toolbar=0,width=750,height=500'); return false;";
        }
    }

    if (window.addEventListener) {
        window.addEventListener('load', share, false);
    }
    else if (document.addEventListener) {
        document.addEventListener('load', share, false);
    }
    else if (window.attachEvent) {
        window.attachEvent('onload', share);
    }
    else {
        window.onload = share;
    }
})();
