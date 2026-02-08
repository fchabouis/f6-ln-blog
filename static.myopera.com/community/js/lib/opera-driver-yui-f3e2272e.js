if(Opera.Driver===undefined){Opera.Driver={};}
(function(){var Y=YAHOO.util;Opera.Driver.YUI={EXPORT:['loadFrameworkDependencies','loadModule','loadModules','loadScripts','get','getAll','hide','show','setAttribute','addEvent','preventDefault','animate','fadeIn','fadeOut','ajax','encodeJson','decodeJson'],loadFrameworkDependencies:function(dependencies,callback,opt){if(!opt){opt={loadOptional:false};}
var config=this.config(),yuiLoader=new Y.YUILoader({base:config.base_url+'/lib/yui/build/',require:dependencies,loadOptional:opt.loadOptional,onFailure:loadFailureHandler,onSuccess:function(){loadSuccessHandler(callback);},timeout:5000,comboBase:config.base_url+'/',combine:parseInt(config.combine)?true:false});yuiLoader.insert();},loadModules:function(moduleNames,callback,opt){var O=this,modules=[];for(var i=0;i<moduleNames.length;++i){var moduleName=moduleNames[i].toLowerCase();modules.push('lib/yui-modules/'+moduleName+'/'+moduleName);}
this.loadScripts(modules,function(){var dependencies=[];for(var i=0;i<moduleNames.length;++i){var module=Opera.Driver.YUI[moduleNames[i]];if(module.DEPENDENCIES){dependencies=dependencies.concat(module.DEPENDENCIES);}
O.extend(module,module.EXPORT);}
if(opt&&opt.extraDependencies){dependencies=dependencies.concat(opt.extraDependencies);}
if(dependencies){O.loadFrameworkDependencies(dependencies,callback,opt);}
else{loadSuccessHandler(callback);}});},loadModule:function(moduleName,callback,opt){this.loadModules([moduleName],callback,opt);},loadScripts:function(scripts,callback,opt){var config=this.config(),combine=parseInt(config.combine),i,l,orig;for(i=0,l=scripts.length;i<l;++i){orig=scripts[i];scripts[i]=this.js_map(scripts[i]);if(!combine&&!/(^https?:\/\/)|(^\/)/.test(scripts[i])){scripts[i]=config.base_url+'/'+scripts[i];}
if(scripts[i]===orig&&scripts[i].indexOf(config.base_url)===0){scripts[i]+=config.minified;}
scripts[i]+=config.extension;}
if(combine){scripts=config.base_url+'/'+scripts.join(',');}
Y.Get.script(scripts,{onFailure:loadFailureHandler,onSuccess:function(){loadSuccessHandler(callback);}});},animate:function(selector,opt,callback){if(opt===undefined){opt={attributes:{},delay:0,duration:1};}
var matches=Y.Selector.query(selector),i=0;while(matches[i]){var el=matches[i++],animation=new Y.Anim(el,opt.attributes,opt.duration);if(callback){animation.onComplete.subscribe(callback);}
setTimeout(function(){animation.animate();},opt.delay);}},fadeIn:function(selector,opt,callback){if(opt===undefined){opt={};}
opt.attributes={opacity:{to:1}};this.animate(selector,opt,callback);},fadeOut:function(selector,opt,callback){if(opt===undefined){opt={};}
opt.attributes={opacity:{to:0}};this.animate(selector,opt,callback);},hide:function(selector){var el=selector;if(typeof(selector)==='string'){el=Y.Selector.query(selector);}
Y.Dom.setStyle(el,'display','none');},show:function(selector){var el=selector;if(typeof(selector)==='string'){el=Y.Selector.query(selector);}
Y.Dom.setStyle(el,'display','block');},get:function(selector){var el=this.getAll(selector);if(el){return el[0];}},getAll:function(selector){return Y.Selector.query(selector);},setAttribute:function(selector,attribute,value){if(!selector||!attribute){return;}
var elements=this.getAll(selector);for(var i=0;i<elements.length;++i){if(!value){elements[i].removeAttribute(attribute);}
else{Y.Dom.setAttribute(elements[i],attribute,value);}}},addEvent:function(selector,eventType,callback,opt){var el=selector;if(typeof(selector)==='string'){el=Y.Selector.query(selector);}
if(el){Y.Event.addListener(el,eventType,callback);}},preventDefault:function(e){Y.Event.preventDefault(e);},ajax:function(url,callback,data,opt){if(opt===undefined){opt={};}
if(!opt.method){opt.method='GET';}
if((data!==undefined)&&(typeof(data)==='object')){var pairs=[];for(var k in data){pairs.push(encodeURIComponent(k)+'='+encodeURIComponent(data[k]));}
data=pairs.join('&');}
if((opt!==undefined)&&(opt.form!==undefined)){Y.Connect.setForm(opt.form);}
if((opt.method.toUpperCase()=='GET')&&data){url+='?'+data;}
return Y.Connect.asyncRequest(opt.method.toUpperCase(),url,callback,data);},decodeJson:function(json,opt){return YAHOO.lang.JSON.parse(json);},encodeJson:function(json,opt){return YAHOO.lang.JSON.stringify(json);}};function loadSuccessHandler(callback){if(callback){Y.Event.onDOMReady(callback);}
return;}
function loadFailureHandler(callback){alert('Failure in loading scripts/dependencies');}})();/*
=pod

=head1 NAME

opera-driver-yui.js - Collection of methods that use YUI for extending Opera namespace

=head1 VERSION

This document describes opera-driver-yui.js version %%VERSION%%

=head1 SYNOPSIS

    // in the HTML source
    <script type="text/javascript" src="http://static.myopera.com/community/js/2.8.0r4/build/yuiloader-dom-event/yuiloader-dom-event.js"></script>
    <script type="text/javascript" src="http://static.myopera.com/community/js/2.8.0r4/build/selector/selector-min.js"></script>
    <script type="text/javascript" src="http://static.myopera.com/community/js/lib/opera-min.js"></script>
    <script type="text/javascript" src="http://static.myopera.com/community/js/lib/opera-driver-yui-min.js"></script>

    <script type="text/javascript">
    // instantiate the class specifying the configuration
    var O = new Opera({
        base_url: "http://static.myopera.com/community/js/",
        driver: "yui",
        minified: "-min"
    });

    // load scripts in the page
    // relative URL, minified and extension are automatically added
    O.loadScripts(['site/albums-utils']);
    </script>


    // in a js file loaded in the page through loadScripts

    // load framework (driver) dependencies
    O.loadFrameworkDependencies(['imagecropper'], callback, {loadOptional: true});

    // load other scripts in the page
    // relative to the current host
    O.loadScripts(['/community/js/site/albums-utils']);

    // relative to the current base_url
    O.loadScripts(['site/albums-utils']);

    // absolute, even from other sources
    O.loadScripts(['http://otherhost.domain.tld/script.js']);

    // load a single module
    O.loadModule('Autocomplete', function () {O.autocomplete('#recipient');});

    // load several modules (with extra YUI dependencies)
    O.loadModules(['Ajax','Animation'], callback, {extraDependencies: ['resize']});

    // get the first <p> in the element with id equal to `test'
    O.get('#test p:first-child');

    // get all li elements
    O.getAll('#test ul li');

    // attach an event handler
    O.addEvent('#test a', 'click', function () { alert('You clicked!'); }); 

    </script>

=head1 DESCRIPTION

opera-driver-yui.js should not be used alone, it's loaded by the main Opera class when
its constructor is called and the driver selected is yui.

The driver is a collection of methods and functions in the form of an object literal.
It can contain public and private methods (not included in the list of exported
methods) and private functions (which are not class methods).

The methods use specific calls of the YUI framework and its libraries.

The driver can be extended through additional modules; this has the double advantage of
keeping its overall size reasonable small while providing enough basic functionalities and
adding more advanced and specific functionalities only when needed.

=head1 SUBROUTINES/METHODS

=head2 INSTANCE METHODS

=head3 C<loadScripts(scripts, callback, opt)>

Dynamically loads the list of libs/scripts and put them in the C<head> of the
current HTML document as C<script> tags.

=head4 Parameters

=over 4

=item C<scripts>

Array literal with the list of absolute/relative URL's of the files to include.
Relative URL's will have the host/path and file suffix automatically added.

Have a look at the examples.

=item C<callback>

Optional pointer to a function to execute when the load is successfully
completed. It is assigned to the DOM ready event.

=item C<opt>

Optional object literal for additional options.

=back

=head3 C<loadModule(module, callback, opt)>

Does the same as C<loadModules> just for one module.
Here mostly for backwards compatibility.

=head3 C<loadModules(modules, callback, opt)>

Dynamically loads the modules (via C<loadScripts()>), all the optional framework
dependencies (via C<loadFrameworkDependencies()>) and extends the Opera class
with the methods defined in the EXPORT list of the modules.

=head4 Parameters

=over 4

=item C<modules>

The list with the modules' names.
The file name of the module must be the lowercased module name.

=item C<callback>

Optional (but you'll use it) pointer to a function to execute when the load is successfully
completed. It is assigned to the DOM ready event.

=item C<opt>

Optional object literal for additional options.

=over 4

=item C<extraDependencies>

List of additional framework dependencies to load other than the ones required by the modules.

=back

=back

=head3 C<loadFrameworkDependencies(dependencies, callback, opt)>

Dynamically loads specific YUI dependencies, uses the YUI loader utility
which automagically handles all the dependencies of each requested library.

=head4 Parameters

=over 4

=item C<dependencies>

Array literal with the list of YUI dependencies.

=item C<callback>

Optional pointer to a function to execute when the load is successfully
completed. It is assigned to the DOM ready event.

=item C<opt>

Optional object literal for controlling options of the YUI loader.

=over 4

=item C<loadOptional>

true/false (default false) flag for enabling the inclusion of optional dependencies.
ie: YUI "autocomplete" has "animation" as optional dependency.

=back

=back

=head3 C<get(selector)>

Returns the first DOM element that matches the specified C<selector>.

=head4 Parameters

=over 4

=item C<selector>

CSS selector. YUI Selector is used.

=back

=head3 C<getAll(selector)>

Returns the list of DOM elements that match the specified C<selector>.

=head4 Parameters

=over 4

=item C<selector>

CSS selector. YUI Selector is used.

=back

=head3 C<addEvent(selector, eventType, callback, opt)>

Adds an event listener to the elements that match the selector.
Instead of the CSS selector is possible to pass a DOM element, or a list of elements.

=head4 Parameters

=over 4

=item C<selector>

CSS selector (YUI Selector is used), DOM element or a list of elements.

=item C<eventType>

Type of the event (do NOT prepend "on").

=item C<callback>

Pointer to the function to execute when the event is fired.

=item C<opt>

Optional object literal with additional properties.

=back

=head3 C<ajax(url, callback, data, opt)>

Implements the AJAX technology.
This is the generic method for making asynchronous requests and calling
methods for processing the responses.

Returns the YUI connection object.

=head4 Parameters

=over 4

=item C<url>

The URL on which place the request.
Can contain the encoded search part, in that case is not
necessary to pass the arguments in the C<data> variable.

=item C<callback>

Object literal with the definitions of the callbacks.
Usually at least a success and failure callbacks should be defined.

Example:
 var callbacks = {
    success: function (o) {alert('Success! \o/');},
    failure: function (o) {alert('Something went wrong, dammit!');}
 };

Other parameters can be set here, see the YUI Connection documentation.

=item C<data>

The data to send, normally is the POST body in POST requests.
It's possible to pass the encoded search portion of the URL,
or an object literal with key/value pairs that will be encoded and
stringified.

=item C<opt>

Object literal with options for controlling the call, like for example
the method to use GET/POST/HEAD, etc...
Valid options are:

=over 4

=item C<method>

Normally GET or POST.

=item C<form>

The id or name or form DOM object of the form to submit.
The whole form will be submitted, and in case something is
passed in C<data> it will be merged with the form data.

=back

=back

=head3 C<animate(selector, opt, callback)>

Generic animation method. Uses the YUI animation library.
Applies the specified animation effect on the elements that match
the selector.

=head4 Parameters

=over 4

=item C<selector>

CSS selector. YUI Selector is used.

=item C<opt>

Object literal for specifying the animation properties.

=item C<callback>

Optional pointer to a function to call when the animation
is completed.

=back

=head3 C<decodeJson(json)>

Converts a JSON string into a JSON object (object literal).
Typical use is decoding a JSON response coming from an AJAX request.

=head4 Parameters

=over 4

=item C<json>

JSON string to convert

=back

=head3 C<encodeJson(json)>

Converts a JSON object (object literal) into a JSON string.

=head4 Parameters

=over 4

=item C<json>

JSON object to stringify

=back

=head3 C<fadeOut(selector, opt, callback)>

Adds a fade out effect to the elements that match the selector.

=head4 Parameters

=over 4

=item C<selector>

CSS selector. Uses YUI Selector.

=item C<opt>

Object literal with optional properties.
ie: "delay", "duration"

=item C<callback>

Optional pointer to a function to call when the animation
is completed.

=back

=head3 C<fadeIn(selector, opt, callback)>

Adds a fade in effect to the elements that match the selector.

For the parameters explanation see C<fadeOut()>.

=head3 C<hide(selector)>

Hides from the page the elements that match the selector.

=head4 Parameters

=over 4

=item C<selector>

CSS selector. Uses YUI Selector.

=back

=head3 C<preventDefault(e)>

Stops execution of browser's default events' actions, bubbling, etc...
Required when developing AJAX things.
The event is automatically passed as argument.

=head3 C<setAttribute(selector, attribute, value)>

Sets a value for the specified attribute on one or more DOM elements
identified by the CSS selector.
If the value is C<false> or empty the attribute is removed.

=over 4

=item C<selector>

CSS selector. Uses YUI Selector.

=item C<attribute>

DOM element attribute name to set/change/remove.

=item C<value>

New value to assign to the attribute.
False or empty values remove the attribute.

=back

=head3 C<show(selector)>

Shows elements in the page that match the selector and were
hidden.

For parameters see C<hide()>

=head2 PRIVATE SUBROUTINES

=head3 C<loadSuccessHandler(callback)>

Called when scripts/dependencies are loaded successfully
via C<loadScripts()> or C<loadFrameworkDependencies()>.

=head4 Parameters

=over 4

=item C<callback>

Optional pointer to a function to execute when C<loadScripts()>
or C<loadFrameworkDependencies()> return success.

=back

=head3 C<loadFailureHandler(callback)>

Called when dependencies are not loaded successfully
via C<loadScripts()> or C<loadFrameworkDependencies()>.

For the parameters see C<loadSuccessHandler()>.

=head1 SEE ALSO

=over 4

=item Main Opera namespace: C<opera.js>.

=back

=head1 AUTHOR

Edoardo Sabadelli <edoardos@opera.com>

=head1 LICENSE AND COPYRIGHT

Copyright (c), 2009 Opera Software ASA.
All rights reserved.
*/