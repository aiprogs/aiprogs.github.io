(function () {

    var queryString = {},
        browserMovedToBackground = false;

    // Parse the query string so we can take individual query string params
    (function (search) {

        search = (search || '').split(/[\&\?]/g);
        for (var i = 0, count = search.length; i < count; i++) {
            if (!search[i]) continue;
            var pair = search[i].split('=');
            queryString[pair[0]] = queryString[pair[0]] !== undefined ?
                ([pair[1] || ''].concat(queryString[pair[0]])) :
                (pair[1] || '');
        }

    })(window.location.search);


    var AppRedirect = {
        redirect: function (options) {
            var hasIos = !!(options.iosApp);
            var hasAndroid = !!(options.android);

            var intent = options.android;
            var intentUrl = 'intent://' + intent.host + '#Intent;' +
                'scheme=' + encodeURIComponent(intent.scheme) + ';' +
                'package=' + encodeURIComponent(intent.package) + ';' +
                (intent.action ? 'action=' + encodeURIComponent(intent.action) + ';' : '') +
                (intent.category ? 'category=' + encodeURIComponent(intent.category) + ';' : '') +
                (intent.component ? 'component=' + encodeURIComponent(intent.component) + ';' : '') +
                (intent.fallback ? 'S.browser_fallback_url=' + encodeURIComponent(intent.fallback) + ';' : '') +
                'end';

            if (hasAndroid && /Android/.test(navigator.userAgent)) {
                alert('this is Android');

                var anchor = document.createElement('a');
                document.body.appendChild(anchor);
                anchor.href = intentUrl;
                if (anchor.click) {
                    anchor.click();
                } else {
                    window.location = intentUrl;
                }
            }

        }
    }
    window.AppRedirect = AppRedirect;

});
