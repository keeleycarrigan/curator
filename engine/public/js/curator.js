/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
if("document" in self){if(!("classList" in document.createElement("_"))){(function(j){"use strict";if(!("Element" in j)){return}var a="classList",f="prototype",m=j.Element[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.getAttribute("class")||""),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.setAttribute("class",this.toString())}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false,q;do{r=t[s]+"";q=g(this,r);while(q!==-1){this.splice(q,1);o=true;q=g(this,r)}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}if(q===true||q===false){return q}else{return !o}};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))}else{(function(){var b=document.createElement("_");b.classList.add("c1","c2");if(!b.classList.contains("c2")){var c=function(e){var d=DOMTokenList.prototype[e];DOMTokenList.prototype[e]=function(h){var g,f=arguments.length;for(g=0;g<f;g++){h=arguments[g];d.call(this,h)}}};c("add");c("remove")}b.classList.toggle("c3",false);if(b.classList.contains("c3")){var a=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(d,e){if(1 in arguments&&!this.contains(d)===!e){return e}else{return a.call(this,d)}}}b=null}())}};
/*
    json2.js
    2015-05-03

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse. This file is provides the ES5 JSON capability to ES3 systems.
    If a project might run on IE8 or earlier, then this file should be included.
    This file does nothing on ES5 systems.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 
                            ? '0' + n 
                            : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date 
                    ? 'Date(' + this[key] + ')' 
                    : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint 
    eval, for, this 
*/

/*property
    JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== 'object') {
    JSON = {};
}

(function () {
    'use strict';
    
    var rx_one = /^[\],:{}\s]*$/,
        rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        rx_four = /(?:^|:|,)(?:\s*\[)+/g,
        rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 
            ? '0' + n 
            : n;
    }
    
    function this_value() {
        return this.valueOf();
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear() + '-' +
                        f(this.getUTCMonth() + 1) + '-' +
                        f(this.getUTCDate()) + 'T' +
                        f(this.getUTCHours()) + ':' +
                        f(this.getUTCMinutes()) + ':' +
                        f(this.getUTCSeconds()) + 'Z'
                : null;
        };

        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
    }

    var gap,
        indent,
        meta,
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string) 
            ? '"' + string.replace(rx_escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string'
                    ? c
                    : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' 
            : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) 
                ? String(value) 
                : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                        ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                        : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap 
                                    ? ': ' 
                                    : ':'
                            ) + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap 
                                    ? ': ' 
                                    : ':'
                            ) + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                    ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                    : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                    return '\\u' +
                            ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (
                rx_one.test(
                    text
                        .replace(rx_two, '@')
                        .replace(rx_three, ']')
                        .replace(rx_four, '')
                )
            ) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

/*! highlight.js v9.1.0 | BSD3 License | git.io/hljslicense */
!function(e){"undefined"!=typeof exports?e(exports):(self.hljs=e({}),"function"==typeof define&&define.amd&&define("hljs",[],function(){return self.hljs}))}(function(e){function n(e){return e.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;")}function t(e){return e.nodeName.toLowerCase()}function r(e,n){var t=e&&e.exec(n);return t&&0==t.index}function a(e){return/^(no-?highlight|plain|text)$/i.test(e)}function i(e){var n,t,r,i=e.className+" ";if(i+=e.parentNode?e.parentNode.className:"",t=/\blang(?:uage)?-([\w-]+)\b/i.exec(i))return E(t[1])?t[1]:"no-highlight";for(i=i.split(/\s+/),n=0,r=i.length;r>n;n++)if(E(i[n])||a(i[n]))return i[n]}function o(e,n){var t,r={};for(t in e)r[t]=e[t];if(n)for(t in n)r[t]=n[t];return r}function u(e){var n=[];return function r(e,a){for(var i=e.firstChild;i;i=i.nextSibling)3==i.nodeType?a+=i.nodeValue.length:1==i.nodeType&&(n.push({event:"start",offset:a,node:i}),a=r(i,a),t(i).match(/br|hr|img|input/)||n.push({event:"stop",offset:a,node:i}));return a}(e,0),n}function c(e,r,a){function i(){return e.length&&r.length?e[0].offset!=r[0].offset?e[0].offset<r[0].offset?e:r:"start"==r[0].event?e:r:e.length?e:r}function o(e){function r(e){return" "+e.nodeName+'="'+n(e.value)+'"'}l+="<"+t(e)+Array.prototype.map.call(e.attributes,r).join("")+">"}function u(e){l+="</"+t(e)+">"}function c(e){("start"==e.event?o:u)(e.node)}for(var s=0,l="",f=[];e.length||r.length;){var g=i();if(l+=n(a.substr(s,g[0].offset-s)),s=g[0].offset,g==e){f.reverse().forEach(u);do c(g.splice(0,1)[0]),g=i();while(g==e&&g.length&&g[0].offset==s);f.reverse().forEach(o)}else"start"==g[0].event?f.push(g[0].node):f.pop(),c(g.splice(0,1)[0])}return l+n(a.substr(s))}function s(e){function n(e){return e&&e.source||e}function t(t,r){return new RegExp(n(t),"m"+(e.cI?"i":"")+(r?"g":""))}function r(a,i){if(!a.compiled){if(a.compiled=!0,a.k=a.k||a.bK,a.k){var u={},c=function(n,t){e.cI&&(t=t.toLowerCase()),t.split(" ").forEach(function(e){var t=e.split("|");u[t[0]]=[n,t[1]?Number(t[1]):1]})};"string"==typeof a.k?c("keyword",a.k):Object.keys(a.k).forEach(function(e){c(e,a.k[e])}),a.k=u}a.lR=t(a.l||/\b\w+\b/,!0),i&&(a.bK&&(a.b="\\b("+a.bK.split(" ").join("|")+")\\b"),a.b||(a.b=/\B|\b/),a.bR=t(a.b),a.e||a.eW||(a.e=/\B|\b/),a.e&&(a.eR=t(a.e)),a.tE=n(a.e)||"",a.eW&&i.tE&&(a.tE+=(a.e?"|":"")+i.tE)),a.i&&(a.iR=t(a.i)),void 0===a.r&&(a.r=1),a.c||(a.c=[]);var s=[];a.c.forEach(function(e){e.v?e.v.forEach(function(n){s.push(o(e,n))}):s.push("self"==e?a:e)}),a.c=s,a.c.forEach(function(e){r(e,a)}),a.starts&&r(a.starts,i);var l=a.c.map(function(e){return e.bK?"\\.?("+e.b+")\\.?":e.b}).concat([a.tE,a.i]).map(n).filter(Boolean);a.t=l.length?t(l.join("|"),!0):{exec:function(){return null}}}}r(e)}function l(e,t,a,i){function o(e,n){for(var t=0;t<n.c.length;t++)if(r(n.c[t].bR,e))return n.c[t]}function u(e,n){if(r(e.eR,n)){for(;e.endsParent&&e.parent;)e=e.parent;return e}return e.eW?u(e.parent,n):void 0}function c(e,n){return!a&&r(n.iR,e)}function g(e,n){var t=N.cI?n[0].toLowerCase():n[0];return e.k.hasOwnProperty(t)&&e.k[t]}function h(e,n,t,r){var a=r?"":x.classPrefix,i='<span class="'+a,o=t?"":"</span>";return i+=e+'">',i+n+o}function p(){if(!L.k)return n(M);var e="",t=0;L.lR.lastIndex=0;for(var r=L.lR.exec(M);r;){e+=n(M.substr(t,r.index-t));var a=g(L,r);a?(B+=a[1],e+=h(a[0],n(r[0]))):e+=n(r[0]),t=L.lR.lastIndex,r=L.lR.exec(M)}return e+n(M.substr(t))}function d(){var e="string"==typeof L.sL;if(e&&!R[L.sL])return n(M);var t=e?l(L.sL,M,!0,y[L.sL]):f(M,L.sL.length?L.sL:void 0);return L.r>0&&(B+=t.r),e&&(y[L.sL]=t.top),h(t.language,t.value,!1,!0)}function b(){return void 0!==L.sL?d():p()}function v(e,t){var r=e.cN?h(e.cN,"",!0):"";e.rB?(k+=r,M=""):e.eB?(k+=n(t)+r,M=""):(k+=r,M=t),L=Object.create(e,{parent:{value:L}})}function m(e,t){if(M+=e,void 0===t)return k+=b(),0;var r=o(t,L);if(r)return k+=b(),v(r,t),r.rB?0:t.length;var a=u(L,t);if(a){var i=L;i.rE||i.eE||(M+=t),k+=b();do L.cN&&(k+="</span>"),B+=L.r,L=L.parent;while(L!=a.parent);return i.eE&&(k+=n(t)),M="",a.starts&&v(a.starts,""),i.rE?0:t.length}if(c(t,L))throw new Error('Illegal lexeme "'+t+'" for mode "'+(L.cN||"<unnamed>")+'"');return M+=t,t.length||1}var N=E(e);if(!N)throw new Error('Unknown language: "'+e+'"');s(N);var w,L=i||N,y={},k="";for(w=L;w!=N;w=w.parent)w.cN&&(k=h(w.cN,"",!0)+k);var M="",B=0;try{for(var C,j,I=0;;){if(L.t.lastIndex=I,C=L.t.exec(t),!C)break;j=m(t.substr(I,C.index-I),C[0]),I=C.index+j}for(m(t.substr(I)),w=L;w.parent;w=w.parent)w.cN&&(k+="</span>");return{r:B,value:k,language:e,top:L}}catch(O){if(-1!=O.message.indexOf("Illegal"))return{r:0,value:n(t)};throw O}}function f(e,t){t=t||x.languages||Object.keys(R);var r={r:0,value:n(e)},a=r;return t.forEach(function(n){if(E(n)){var t=l(n,e,!1);t.language=n,t.r>a.r&&(a=t),t.r>r.r&&(a=r,r=t)}}),a.language&&(r.second_best=a),r}function g(e){return x.tabReplace&&(e=e.replace(/^((<[^>]+>|\t)+)/gm,function(e,n){return n.replace(/\t/g,x.tabReplace)})),x.useBR&&(e=e.replace(/\n/g,"<br>")),e}function h(e,n,t){var r=n?w[n]:t,a=[e.trim()];return e.match(/\bhljs\b/)||a.push("hljs"),-1===e.indexOf(r)&&a.push(r),a.join(" ").trim()}function p(e){var n=i(e);if(!a(n)){var t;x.useBR?(t=document.createElementNS("http://www.w3.org/1999/xhtml","div"),t.innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n")):t=e;var r=t.textContent,o=n?l(n,r,!0):f(r),s=u(t);if(s.length){var p=document.createElementNS("http://www.w3.org/1999/xhtml","div");p.innerHTML=o.value,o.value=c(s,u(p),r)}o.value=g(o.value),e.innerHTML=o.value,e.className=h(e.className,n,o.language),e.result={language:o.language,re:o.r},o.second_best&&(e.second_best={language:o.second_best.language,re:o.second_best.r})}}function d(e){x=o(x,e)}function b(){if(!b.called){b.called=!0;var e=document.querySelectorAll("pre code");Array.prototype.forEach.call(e,p)}}function v(){addEventListener("DOMContentLoaded",b,!1),addEventListener("load",b,!1)}function m(n,t){var r=R[n]=t(e);r.aliases&&r.aliases.forEach(function(e){w[e]=n})}function N(){return Object.keys(R)}function E(e){return e=(e||"").toLowerCase(),R[e]||R[w[e]]}var x={classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:void 0},R={},w={};return e.highlight=l,e.highlightAuto=f,e.fixMarkup=g,e.highlightBlock=p,e.configure=d,e.initHighlighting=b,e.initHighlightingOnLoad=v,e.registerLanguage=m,e.listLanguages=N,e.getLanguage=E,e.inherit=o,e.IR="[a-zA-Z]\\w*",e.UIR="[a-zA-Z_]\\w*",e.NR="\\b\\d+(\\.\\d+)?",e.CNR="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",e.BNR="\\b(0b[01]+)",e.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",e.BE={b:"\\\\[\\s\\S]",r:0},e.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[e.BE]},e.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[e.BE]},e.PWM={b:/\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/},e.C=function(n,t,r){var a=e.inherit({cN:"comment",b:n,e:t,c:[]},r||{});return a.c.push(e.PWM),a.c.push({cN:"doctag",b:"(?:TODO|FIXME|NOTE|BUG|XXX):",r:0}),a},e.CLCM=e.C("//","$"),e.CBCM=e.C("/\\*","\\*/"),e.HCM=e.C("#","$"),e.NM={cN:"number",b:e.NR,r:0},e.CNM={cN:"number",b:e.CNR,r:0},e.BNM={cN:"number",b:e.BNR,r:0},e.CSSNM={cN:"number",b:e.NR+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",r:0},e.RM={cN:"regexp",b:/\//,e:/\/[gimuy]*/,i:/\n/,c:[e.BE,{b:/\[/,e:/\]/,r:0,c:[e.BE]}]},e.TM={cN:"title",b:e.IR,r:0},e.UTM={cN:"title",b:e.UIR,r:0},e});hljs.registerLanguage("javascript",function(e){return{aliases:["js"],k:{keyword:"in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await import from as",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"},c:[{cN:"meta",r:10,b:/^\s*['"]use (strict|asm)['"]/},{cN:"meta",b:/^#!/,e:/$/},e.ASM,e.QSM,{cN:"string",b:"`",e:"`",c:[e.BE,{cN:"subst",b:"\\$\\{",e:"\\}"}]},e.CLCM,e.CBCM,{cN:"number",v:[{b:"\\b(0[bB][01]+)"},{b:"\\b(0[oO][0-7]+)"},{b:e.CNR}],r:0},{b:"("+e.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[e.CLCM,e.CBCM,e.RM,{b:/</,e:/>\s*[);\]]/,r:0,sL:"xml"}],r:0},{cN:"function",bK:"function",e:/\{/,eE:!0,c:[e.inherit(e.TM,{b:/[A-Za-z$_][0-9A-Za-z$_]*/}),{cN:"params",b:/\(/,e:/\)/,eB:!0,eE:!0,c:[e.CLCM,e.CBCM]}],i:/\[|%/},{b:/\$[(.]/},{b:"\\."+e.IR,r:0},{cN:"class",bK:"class",e:/[{;=]/,eE:!0,i:/[:"\[\]]/,c:[{bK:"extends"},e.UTM]},{bK:"constructor",e:/\{/,eE:!0}],i:/#(?!!)/}});hljs.registerLanguage("java",function(e){var a=e.UIR+"(<"+e.UIR+"(\\s*,\\s*"+e.UIR+")*>)?",t="false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private",r="\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",c={cN:"number",b:r,r:0};return{aliases:["jsp"],k:t,i:/<\/|#/,c:[e.C("/\\*\\*","\\*/",{r:0,c:[{b:/\w+@/,r:0},{cN:"doctag",b:"@[A-Za-z]+"}]}),e.CLCM,e.CBCM,e.ASM,e.QSM,{cN:"class",bK:"class interface",e:/[{;=]/,eE:!0,k:"class interface",i:/[:"\[\]]/,c:[{bK:"extends implements"},e.UTM]},{bK:"new throw return else",r:0},{cN:"function",b:"("+a+"\\s+)+"+e.UIR+"\\s*\\(",rB:!0,e:/[{;=]/,eE:!0,k:t,c:[{b:e.UIR+"\\s*\\(",rB:!0,r:0,c:[e.UTM]},{cN:"params",b:/\(/,e:/\)/,k:t,r:0,c:[e.ASM,e.QSM,e.CNM,e.CBCM]},e.CLCM,e.CBCM]},c,{cN:"meta",b:"@[A-Za-z]+"}]}});hljs.registerLanguage("haml",function(s){return{cI:!0,c:[{cN:"meta",b:"^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$",r:10},s.C("^\\s*(!=#|=#|-#|/).*$",!1,{r:0}),{b:"^\\s*(-|=|!=)(?!#)",starts:{e:"\\n",sL:"ruby"}},{cN:"tag",b:"^\\s*%",c:[{cN:"selector-tag",b:"\\w+"},{cN:"selector-id",b:"#[\\w-]+"},{cN:"selector-class",b:"\\.[\\w-]+"},{b:"{\\s*",e:"\\s*}",c:[{b:":\\w+\\s*=>",e:",\\s+",rB:!0,eW:!0,c:[{cN:"attr",b:":\\w+"},s.ASM,s.QSM,{b:"\\w+",r:0}]}]},{b:"\\(\\s*",e:"\\s*\\)",eE:!0,c:[{b:"\\w+\\s*=",e:"\\s+",rB:!0,eW:!0,c:[{cN:"attr",b:"\\w+",r:0},s.ASM,s.QSM,{b:"\\w+",r:0}]}]}]},{b:"^\\s*[=~]\\s*"},{b:"#{",starts:{e:"}",sL:"ruby"}}]}});hljs.registerLanguage("objectivec",function(e){var t={cN:"built_in",b:"(AV|CA|CF|CG|CI|MK|MP|NS|UI|XC)\\w+"},i={keyword:"int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required",literal:"false true FALSE TRUE nil YES NO NULL",built_in:"BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"},n=/[a-zA-Z@][a-zA-Z0-9_]*/,o="@interface @class @protocol @implementation";return{aliases:["mm","objc","obj-c"],k:i,l:n,i:"</",c:[t,e.CLCM,e.CBCM,e.CNM,e.QSM,{cN:"string",v:[{b:'@"',e:'"',i:"\\n",c:[e.BE]},{b:"'",e:"[^\\\\]'",i:"[^\\\\][^']"}]},{cN:"meta",b:"#",e:"$",c:[{cN:"meta-string",v:[{b:'"',e:'"'},{b:"<",e:">"}]}]},{cN:"class",b:"("+o.split(" ").join("|")+")\\b",e:"({|$)",eE:!0,k:o,l:n,c:[e.UTM]},{b:"\\."+e.UIR,r:0}]}});hljs.registerLanguage("css",function(e){var c="[a-zA-Z-][a-zA-Z0-9_-]*",t={b:/[A-Z\_\.\-]+\s*:/,rB:!0,e:";",eW:!0,c:[{cN:"attribute",b:/\S/,e:":",eE:!0,starts:{eW:!0,eE:!0,c:[{b:/[\w-]+\s*\(/,rB:!0,c:[{cN:"built_in",b:/[\w-]+/}]},e.CSSNM,e.QSM,e.ASM,e.CBCM,{cN:"number",b:"#[0-9A-Fa-f]+"},{cN:"meta",b:"!important"}]}}]};return{cI:!0,i:/[=\/|'\$]/,c:[e.CBCM,{cN:"selector-id",b:/#[A-Za-z0-9_-]+/},{cN:"selector-class",b:/\.[A-Za-z0-9_-]+/},{cN:"selector-attr",b:/\[/,e:/\]/,i:"$"},{cN:"selector-pseudo",b:/:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/},{b:"@(font-face|page)",l:"[a-z-]+",k:"font-face page"},{b:"@",e:"[{;]",c:[{cN:"keyword",b:/\S+/},{b:/\s/,eW:!0,eE:!0,r:0,c:[e.ASM,e.QSM,e.CSSNM]}]},{cN:"selector-tag",b:c,r:0},{b:"{",e:"}",i:/\S/,c:[e.CBCM,t]}]}});hljs.registerLanguage("less",function(e){var r="[\\w-]+",t="("+r+"|@{"+r+"})",a=[],c=[],s=function(e){return{cN:"string",b:"~?"+e+".*?"+e}},b=function(e,r,t){return{cN:e,b:r,r:t}},i={b:"\\(",e:"\\)",c:c,r:0};c.push(e.CLCM,e.CBCM,s("'"),s('"'),e.CSSNM,{b:"(url|data-uri)\\(",starts:{cN:"string",e:"[\\)\\n]",eE:!0}},b("number","#[0-9A-Fa-f]+\\b"),i,b("variable","@@?"+r,10),b("variable","@{"+r+"}"),b("built_in","~?`[^`]*?`"),{cN:"attribute",b:r+"\\s*:",e:":",rB:!0,eE:!0},{cN:"meta",b:"!important"});var n=c.concat({b:"{",e:"}",c:a}),o={bK:"when",eW:!0,c:[{bK:"and not"}].concat(c)},u={cN:"attribute",b:t,e:":",eE:!0,c:[e.CLCM,e.CBCM],i:/\S/,starts:{e:"[;}]",rE:!0,c:c,i:"[<=$]"}},C={cN:"keyword",b:"@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",starts:{e:"[;{}]",rE:!0,c:c,r:0}},l={cN:"variable",v:[{b:"@"+r+"\\s*:",r:15},{b:"@"+r}],starts:{e:"[;}]",rE:!0,c:n}},p={v:[{b:"[\\.#:&\\[]",e:"[;{}]"},{b:t+"[^;]*{",e:"{"}],rB:!0,rE:!0,i:"[<='$\"]",c:[e.CLCM,e.CBCM,o,b("keyword","all\\b"),b("variable","@{"+r+"}"),b("selector-tag",t+"%?",0),b("selector-id","#"+t),b("selector-class","\\."+t,0),b("selector-tag","&",0),{cN:"selector-attr",b:"\\[",e:"\\]"},{b:"\\(",e:"\\)",c:n},{b:"!important"}]};return a.push(e.CLCM,e.CBCM,C,l,p,u),{cI:!0,i:"[=>'/<($\"]",c:a}});hljs.registerLanguage("scss",function(e){var t="[a-zA-Z-][a-zA-Z0-9_-]*",i={cN:"variable",b:"(\\$"+t+")\\b"},r={cN:"number",b:"#[0-9A-Fa-f]+"};({cN:"attribute",b:"[A-Z\\_\\.\\-]+",e:":",eE:!0,i:"[^\\s]",starts:{eW:!0,eE:!0,c:[r,e.CSSNM,e.QSM,e.ASM,e.CBCM,{cN:"meta",b:"!important"}]}});return{cI:!0,i:"[=/|']",c:[e.CLCM,e.CBCM,{cN:"selector-id",b:"\\#[A-Za-z0-9_-]+",r:0},{cN:"selector-class",b:"\\.[A-Za-z0-9_-]+",r:0},{cN:"selector-attr",b:"\\[",e:"\\]",i:"$"},{cN:"selector-tag",b:"\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b",r:0},{b:":(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)"},{b:"::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)"},i,{cN:"attribute",b:"\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background-blend-mode|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b",i:"[^\\s]"},{b:"\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"},{b:":",e:";",c:[i,r,e.CSSNM,e.QSM,e.ASM,{cN:"meta",b:"!important"}]},{b:"@",e:"[{;]",k:"mixin include extend for if else each while charset import debug media page content font-face namespace warn",c:[i,e.QSM,e.ASM,r,e.CSSNM,{b:"\\s[A-Za-z0-9_.-]+",r:0}]}]}});hljs.registerLanguage("markdown",function(e){return{aliases:["md","mkdown","mkd"],c:[{cN:"section",v:[{b:"^#{1,6}",e:"$"},{b:"^.+?\\n[=-]{2,}$"}]},{b:"<",e:">",sL:"xml",r:0},{cN:"bullet",b:"^([*+-]|(\\d+\\.))\\s+"},{cN:"strong",b:"[*_]{2}.+?[*_]{2}"},{cN:"emphasis",v:[{b:"\\*.+?\\*"},{b:"_.+?_",r:0}]},{cN:"quote",b:"^>\\s+",e:"$"},{cN:"code",v:[{b:"`.+?`"},{b:"^( {4}|	)",e:"$",r:0}]},{b:"^[-\\*]{3,}",e:"$"},{b:"\\[.+?\\][\\(\\[].*?[\\)\\]]",rB:!0,c:[{cN:"string",b:"\\[",e:"\\]",eB:!0,rE:!0,r:0},{cN:"link",b:"\\]\\(",e:"\\)",eB:!0,eE:!0},{cN:"symbol",b:"\\]\\[",e:"\\]",eB:!0,eE:!0}],r:10},{b:"^\\[.+\\]:",rB:!0,c:[{cN:"symbol",b:"\\[",e:"\\]:",eB:!0,eE:!0,starts:{cN:"link",e:"$"}}]}]}});hljs.registerLanguage("json",function(e){var t={literal:"true false null"},i=[e.QSM,e.CNM],r={e:",",eW:!0,eE:!0,c:i,k:t},s={b:"{",e:"}",c:[{cN:"attr",b:'\\s*"',e:'"\\s*:\\s*',eB:!0,eE:!0,c:[e.BE],i:"\\n",starts:r}],i:"\\S"},n={b:"\\[",e:"\\]",c:[e.inherit(r)],i:"\\S"};return i.splice(i.length,0,s,n),{c:i,k:t,i:"\\S"}});hljs.registerLanguage("ruby",function(e){var b="[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",c="and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",r={cN:"doctag",b:"@[A-Za-z]+"},a={b:"#<",e:">"},s=[e.C("#","$",{c:[r]}),e.C("^\\=begin","^\\=end",{c:[r],r:10}),e.C("^__END__","\\n$")],n={cN:"subst",b:"#\\{",e:"}",k:c},t={cN:"string",c:[e.BE,n],v:[{b:/'/,e:/'/},{b:/"/,e:/"/},{b:/`/,e:/`/},{b:"%[qQwWx]?\\(",e:"\\)"},{b:"%[qQwWx]?\\[",e:"\\]"},{b:"%[qQwWx]?{",e:"}"},{b:"%[qQwWx]?<",e:">"},{b:"%[qQwWx]?/",e:"/"},{b:"%[qQwWx]?%",e:"%"},{b:"%[qQwWx]?-",e:"-"},{b:"%[qQwWx]?\\|",e:"\\|"},{b:/\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/}]},i={cN:"params",b:"\\(",e:"\\)",endsParent:!0,k:c},d=[t,a,{cN:"class",bK:"class module",e:"$|;",i:/=/,c:[e.inherit(e.TM,{b:"[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"}),{b:"<\\s*",c:[{b:"("+e.IR+"::)?"+e.IR}]}].concat(s)},{cN:"function",bK:"def",e:"$|;",c:[e.inherit(e.TM,{b:b}),i].concat(s)},{cN:"symbol",b:e.UIR+"(\\!|\\?)?:",r:0},{cN:"symbol",b:":",c:[t,{b:b}],r:0},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{b:"(\\$\\W)|((\\$|\\@\\@?)(\\w+))"},{b:"("+e.RSR+")\\s*",c:[a,{cN:"regexp",c:[e.BE,n],i:/\n/,v:[{b:"/",e:"/[a-z]*"},{b:"%r{",e:"}[a-z]*"},{b:"%r\\(",e:"\\)[a-z]*"},{b:"%r!",e:"![a-z]*"},{b:"%r\\[",e:"\\][a-z]*"}]}].concat(s),r:0}].concat(s);n.c=d,i.c=d;var o="[>?]>",l="[\\w#]+\\(\\w+\\):\\d+:\\d+>",u="(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",w=[{b:/^\s*=>/,starts:{e:"$",c:d}},{cN:"meta",b:"^("+o+"|"+l+"|"+u+")",starts:{e:"$",c:d}}];return{aliases:["rb","gemspec","podspec","thor","irb"],k:c,i:/\/\*/,c:s.concat(w).concat(d)}});hljs.registerLanguage("xml",function(s){var t="[A-Za-z0-9\\._:-]+",e={b:/<\?(php)?(?!\w)/,e:/\?>/,sL:"php"},r={eW:!0,i:/</,r:0,c:[e,{cN:"attr",b:t,r:0},{b:"=",r:0,c:[{cN:"string",c:[e],v:[{b:/"/,e:/"/},{b:/'/,e:/'/},{b:/[^\s\/>]+/}]}]}]};return{aliases:["html","xhtml","rss","atom","xsl","plist"],cI:!0,c:[{cN:"meta",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},s.C("<!--","-->",{r:10}),{b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{name:"style"},c:[r],starts:{e:"</style>",rE:!0,sL:["css","xml"]}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{name:"script"},c:[r],starts:{e:"</script>",rE:!0,sL:["actionscript","javascript","handlebars","xml"]}},e,{cN:"meta",b:/<\?\w+/,e:/\?>/,r:10},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"name",b:/[^\/><\s]+/,r:0},r]}]}});hljs.registerLanguage("swift",function(e){var i={keyword:"__COLUMN__ __FILE__ __FUNCTION__ __LINE__ as as! as? associativity break case catch class continue convenience default defer deinit didSet do dynamic dynamicType else enum extension fallthrough false final for func get guard if import in indirect infix init inout internal is lazy left let mutating nil none nonmutating operator optional override postfix precedence prefix private protocol Protocol public repeat required rethrows return right self Self set static struct subscript super switch throw throws true try try! try? Type typealias unowned var weak where while willSet",literal:"true false nil",built_in:"abs advance alignof alignofValue anyGenerator assert assertionFailure bridgeFromObjectiveC bridgeFromObjectiveCUnconditional bridgeToObjectiveC bridgeToObjectiveCUnconditional c contains count countElements countLeadingZeros debugPrint debugPrintln distance dropFirst dropLast dump encodeBitsAsWords enumerate equal fatalError filter find getBridgedObjectiveCType getVaList indices insertionSort isBridgedToObjectiveC isBridgedVerbatimToObjectiveC isUniquelyReferenced isUniquelyReferencedNonObjC join lazy lexicographicalCompare map max maxElement min minElement numericCast overlaps partition posix precondition preconditionFailure print println quickSort readLine reduce reflect reinterpretCast reverse roundUpToAlignment sizeof sizeofValue sort split startsWith stride strideof strideofValue swap toString transcode underestimateCount unsafeAddressOf unsafeBitCast unsafeDowncast unsafeUnwrap unsafeReflect withExtendedLifetime withObjectAtPlusZero withUnsafePointer withUnsafePointerToObject withUnsafeMutablePointer withUnsafeMutablePointers withUnsafePointer withUnsafePointers withVaList zip"},t={cN:"type",b:"\\b[A-Z][\\w']*",r:0},n=e.C("/\\*","\\*/",{c:["self"]}),r={cN:"subst",b:/\\\(/,e:"\\)",k:i,c:[]},a={cN:"number",b:"\\b([\\d_]+(\\.[\\deE_]+)?|0x[a-fA-F0-9_]+(\\.[a-fA-F0-9p_]+)?|0b[01_]+|0o[0-7_]+)\\b",r:0},o=e.inherit(e.QSM,{c:[r,e.BE]});return r.c=[a],{k:i,c:[o,e.CLCM,n,t,a,{cN:"function",bK:"func",e:"{",eE:!0,c:[e.inherit(e.TM,{b:/[A-Za-z$_][0-9A-Za-z$_]*/,i:/\(/}),{b:/</,e:/>/,i:/>/},{cN:"params",b:/\(/,e:/\)/,endsParent:!0,k:i,c:["self",a,o,e.CBCM,{b:":"}],i:/["']/}],i:/\[|%/},{cN:"class",bK:"struct protocol class extension enum",k:i,e:"\\{",eE:!0,c:[e.inherit(e.TM,{b:/[A-Za-z$_][0-9A-Za-z$_]*/})]},{cN:"meta",b:"(@warn_unused_result|@exported|@lazy|@noescape|@NSCopying|@NSManaged|@objc|@convention|@required|@noreturn|@IBAction|@IBDesignable|@IBInspectable|@IBOutlet|@infix|@prefix|@postfix|@autoclosure|@testable|@available|@nonobjc|@NSApplicationMain|@UIApplicationMain)"},{bK:"import",e:/$/,c:[e.CLCM,n]}]}});hljs.registerLanguage("php",function(e){var c={b:"\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"},a={cN:"meta",b:/<\?(php)?|\?>/},i={cN:"string",c:[e.BE,a],v:[{b:'b"',e:'"'},{b:"b'",e:"'"},e.inherit(e.ASM,{i:null}),e.inherit(e.QSM,{i:null})]},t={v:[e.BNM,e.CNM]};return{aliases:["php3","php4","php5","php6"],cI:!0,k:"and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",c:[e.CLCM,e.HCM,e.C("/\\*","\\*/",{c:[{cN:"doctag",b:"@[A-Za-z]+"},a]}),e.C("__halt_compiler.+?;",!1,{eW:!0,k:"__halt_compiler",l:e.UIR}),{cN:"string",b:/<<<['"]?\w+['"]?$/,e:/^\w+;?$/,c:[e.BE,{cN:"subst",v:[{b:/\$\w+/},{b:/\{\$/,e:/\}/}]}]},a,c,{b:/(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/},{cN:"function",bK:"function",e:/[;{]/,eE:!0,i:"\\$|\\[|%",c:[e.UTM,{cN:"params",b:"\\(",e:"\\)",c:["self",c,e.CBCM,i,t]}]},{cN:"class",bK:"class interface",e:"{",eE:!0,i:/[:\(\$"]/,c:[{bK:"extends implements"},e.UTM]},{bK:"namespace",e:";",i:/[\.']/,c:[e.UTM]},{bK:"use",e:";",c:[e.UTM]},{b:"=>"},i,t]}});
(function (window, document, undefined) {
	var _c = window._c || {};
	
	_c.byID = function (id) {
		return document.getElementById(id);
	};
	
	_c.select = function (selector) {
		return document.querySelector(selector);
	};
	
	_c.selectAll = function (selector) {
		return document.querySelectorAll(selector);
	};
	
	_c.getIndex = function (node) {
		var children = node.parentNode.childNodes,
			num = 0;

		for (var i = 0, numChildren = children.length; i < numChildren; i += 1) {
			if (children[i] === node) {
				return num;
			} else if (children[i].nodeType == 1) {
				num += 1;
			}
		}

		return -1;
	};

	_c.arrayMove = function(array, pos1, pos2) {
		// local variables
		var i, tmp;
		// cast input parameters to integers
		pos1 = parseInt(pos1, 10);
		pos2 = parseInt(pos2, 10);
		// if positions are different and inside array
		if (pos1 !== pos2 && 0 <= pos1 && pos1 <= array.length && 0 <= pos2 && pos2 <= array.length) {
			// save element from position 1
			tmp = array[pos1];
			// move element down and shift other elements up
			if (pos1 < pos2) {
				for (i = pos1; i < pos2; i++) {
				array[i] = array[i + 1];
				}
			}
			// move element up and shift other elements down
			else {
				for (i = pos1; i > pos2; i--) {
				array[i] = array[i - 1];
				}
			}
			// put element from position 1 to destination
			array[pos2] = tmp;
		}
		
		return array;
	};

	_c.getParents = function (elem, selector) {

		var parents = [],
			firstChar;

		if (selector) {
			firstChar = selector.charAt(0);
		}

		// Get matches
		for (; elem && elem !== document; elem = elem.parentNode) {
			if (selector) {

				// If selector is a class
				if (firstChar === '.') {
					if (elem.classList.contains(selector.substr(1))) {
						parents = elem;
						break;
					}
				}

				// If selector is an ID
				if (firstChar === '#') {
					if (elem.id === selector.substr(1)) {
						parents = elem;
						break;
					}
				}

				// If selector is a data attribute
				if (firstChar === '[') {
					if (elem.hasAttribute(selector.substr(1, selector.length - 1))) {
						parents = elem;
						break;
					}
				}

				// If selector is a tag
				if (elem.tagName.toLowerCase() === selector) {
					parents = elem;
					break;
				}
			} else {
				parents = elem;
				break;
			}
		}

		return parents;
	};
	
	_c.on = function (eventName, selector, fn) {
		var selected;
		
		if (selector instanceof Object) {
			selected = selector;
		} else {
			selected = document.querySelectorAll(selector);
		}

		if (selected.length && selected.length > 0) {
			for (var i = 0, numEls = selected.length; i < numEls; i += 1) {
				selected[i].addEventListener(eventName, fn);
			}
		} else {
			selected.addEventListener(eventName, fn);
		}
	};
	
	_c.delegate = function (delegate, eventName, selector, fn, capture) {
		capture = capture || false;

		var element;
		
		if (delegate instanceof Object) {
			element = delegate;
		} else {
			element = document.querySelector(delegate);
		}

		element.addEventListener(eventName, function(event) {
			var possibleTargets = element.querySelectorAll(selector);
			var target = event.target;

			for (var i = 0, l = possibleTargets.length; i < l; i++) {
				var el = target,
					currentEl = possibleTargets[i];

				while(el && el !== element) {
					if (el === currentEl) {
						return fn.call(currentEl, event);
					}

					el = el.parentNode;
				}
			}
		}, capture);
	};
	
	window._c = _c;
})(window, document);
(function (window, document, undefined) {
	var curator = window.curator || {};
	
	var configCtrl = (function () {
			var $form = _c.byID('c-config-form'),
				parseValues = function (items) {
					var values = false;

					if (items && !_c.select('.error')) {
						values = {
							cssFiles: [],
							jsFiles: []
						};

						for (var i = 0, total = items.length; i < total; i += 1) {
							var $item = items[i],
								name = $item.name,
								value = $item.value;
							
							if (value && value.trim() !== '') {
								if (/js-file-/.test(name)) {
									values.jsFiles.push(value);
								} else if (/css-file-/.test(name)) {
									values.cssFiles.push(value);
								} else {
									values[name] = value;
								}
							}
						}
					}
					
					return values;
				},
				reorderFileIds = function ($inputs) {
					for (var i = 0, numInputs = $inputs.length; i < numInputs; i += 1) {
						var $input = $inputs[i],
							type = /js-/.test($input.name) ?  'js' : 'css',
							inputId = type + '-file-' + i;
						
						$input.name = inputId;
						$input.id = inputId;
					}
				},
				getHTML = function (item) {
					return item.outerHTML;
				},
				moveAsset = function (e) {
					e.preventDefault();

					var direction = this.getAttribute('data-move'),
						$row = _c.getParents(this, '.c-row'),
						curIdx = _c.getIndex($row),
						nextIdx = direction === 'up' ? curIdx - 1 : curIdx + 1,
						$list = $row.parentNode,
						$rowArray = [].slice.call($row.parentNode.querySelectorAll('.c-row'));

					var newHTML = _c.arrayMove($rowArray, curIdx, nextIdx).map(getHTML).join('');

					$list.innerHTML = newHTML;
					reorderFileIds($list.querySelectorAll('input'));
				},
				removeFileListing = function ($listing) {
					var $parent = $listing.parentNode;

					$listing.parentNode.removeChild($listing);
					
					reorderFileIds($parent.querySelectorAll('input'));
				},
				handleInputBlur = function (e) {
					if (this.value.trim() === '') {
						if (/-file-/.test(this.name)) {
							removeFileListing(_c.getParents(this, '.c-row'));
						} else {
							this.classList.add('error');
						}
					} else {
						this.setAttribute('value', this.value.trim());
						this.classList.remove('error');
					}
				},
				addAsset = function (e) {
					e.preventDefault();
					
					var fileType = this.getAttribute('data-add-file'),
						$list = _c.select('[name="' + fileType + 'Files"] .c-file-list'),
						nextIdx = $list.querySelectorAll('input').length,
						id = fileType + '-file-' + nextIdx;
						
					var $row = document.createElement('li'),
						rowHTML = '<div class="c-grid-two-third">' + "\n";

						rowHTML += '<input type="text" name="' + id + '" class="c-edit-input" />' + "\n";
						rowHTML += '</div>' + "\n";
						rowHTML += '<div class="c-grid-one-third">' + "\n";
						rowHTML += '<a href="#" data-move="up"><i class="c-icon-up-arrow"></i></a>' + "\n";
						rowHTML += '<a href="#" data-move="down"><i class="c-icon-down-arrow"></i></a>' + "\n";
						rowHTML += '</div>' + "\n";
					
					$row.classList.add('c-row');
					$row.innerHTML = rowHTML;
					
					$list.appendChild($row);
					$row.querySelector('input').focus();
				},
				showRespMsg = function (el) {
					var $el = _c.byID(el);
					
					$el.classList.add('show');
									
					var addFade = setTimeout(function () {
							$el.classList.add('fade-out');
							
							clearTimeout(addFade);
						}, 10),
						fadeOut = setTimeout(function () {
							$el.classList.remove('show', 'fade-out');
							
							clearTimeout(fadeOut);
						}, 5000);
				},
				saveConfig = function (e) {
					e.preventDefault();
					
					var values = parseValues(_c.selectAll('.c-edit-input')),
						ajax = new XMLHttpRequest();
					
					if (values) {
						ajax.open('POST', '/config/save', true);
						ajax.setRequestHeader('Content-Type', 'application/json');
						ajax.send(JSON.stringify(values));
						
						ajax.onreadystatechange = function () {
							var DONE = 4,
								OK = 200;

							if (ajax.readyState === DONE) {
								if (ajax.status === OK) {
									showRespMsg('success-msg');

									console.log('success!');
									
								} else {
									showRespMsg('error-msg');

									console.log('error!');
								}
							}
						};
					} else {
						console.log('form error');
					}

				},
				init = function () {
					if ($form) {
						_c.on('click', _c.byID('save-config'), saveConfig);
						_c.delegate($form, 'click', '[data-add-file]', addAsset);
						_c.delegate($form, 'click', '[data-move]', moveAsset);
						_c.delegate($form, 'blur', 'input', handleInputBlur, true);
					}
				};
		
			return {
				init: init
			};
		})();
	
	curator.configCtrl = configCtrl;
	curator.configCtrl.init();

	window.curator = curator;
})(window, document);
(function (window, document, undefined) {
	var curator = window.curator || {};
	
	var siteCtrl = (function () {
			var setNavTop = function () {
					_c.select('.c-nav').style.top = window.scrollY + 'px';
				},
				selectLinkHash = function () {
					var $hash = _c.select('.c-nav-list [href="' + window.location.hash + '"]'),
						$active = _c.select('.c-nav-list .active');

					if ($active) {
						$active.classList.remove('active');
					}
					
					if ($hash) {
						$hash.classList.add('active');
					}
				},
				handleHashChange = function () {
					selectLinkHash();
					setNavTop();
				},
				toggleNav = function (e) {
					e.preventDefault();

					setNavTop();
					_c.select('body').classList.toggle('c-nav-toggled');
				},
				toggleMatSrc = function (e) {
					e.preventDefault();

					var srcId = this.getAttribute('data-toggle-src');
					
					_c.select('[data-mat-src="' + srcId + '"]').classList.toggle('show');
				},
				init = function () {
					_c.delegate(document, 'click', '[data-toggle-src]', toggleMatSrc);
					_c.on('click', '[data-toggle-nav]', toggleNav);
					_c.on('hashchange', window, handleHashChange);
					
					selectLinkHash();
				};
		
			return {
				init: init,
				toggleNav: toggleNav
			};
		})();
	
	curator.siteCtrl = siteCtrl;
	curator.siteCtrl.init();

	window.curator = curator;
})(window, document);