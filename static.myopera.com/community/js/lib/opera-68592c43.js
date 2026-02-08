function Opera(config){this.version=Opera.VERSION;this.config(config);this.variables({});this.loadDriver(config.driver);}
Opera.VERSION='1.0';Opera.prototype={addVariables:function(variables){for(variable in variables){this.vars[variable]=variables[variable];}},config:function(config){if(config){this.configuration=config;}
return this.configuration;},set_js_map:function(mapping){this._js_mapping=mapping;return this._js_mapping;},js_map:function(source){return this._js_mapping[source]||source;},escapeXML:function(str){if(typeof str!='string')return;return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');},extend:function(obj,methods){var i=0;if(methods===undefined){methods=obj.EXPORT;}
while(methods[i]){var m=methods[i++];this[m]=obj[m];}},loadDriver:function(driverName){var driver=undefined;switch(driverName){case'yui':if(Opera.Driver.YUI!==undefined){driver=Opera.Driver.YUI;}
break;default:alert('No driver selected or driver failure!');}
if(driver){this.extend(driver,driver.EXPORT);}},variables:function(variables){if(variables){this.vars=variables;}
return this.vars;}};/*
=pod

=head1 NAME

opera.js - Opera namespace, a JavaScript class with generic functionalities

=head1 VERSION

This document describes opera.js version %%VERSION%%

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
        minified: "-min",
        driver: "yui"
    });

    // get the config object literal
    var config = O.config();

    // set some additional variables
    O.variables({coolness: 100});

    // load framework (driver) dependencies
    O.loadFrameworkDependencies(['colorpicker'], {loadOptional: true});

    // load a driver module
    O.loadModule('Autocomplete', function () {O.autocomplete('#recipient');});

    // load scripts in the page
    O.loadScripts(['site/albums-utils']);

    // hide all span with class `hidden'
    O.hide('span.hidden');

    // get the first <p> in the element with id equal to `test'
    O.get('#test p:first-child');
    </script>

=head1 DESCRIPTION

opera.js does only define some methods for importing functions in its namespace
from another JavaScript object which normally is an external driver.

The driver needs to be included in the HTML with a script tag together with the
opera.js file, since there is no way of including it dinamically within opera.js.

There are methods for dynamically importing libraries and scripts, but they
depend on the driver used, so they are defined in the driver.

Every method added with the C<extend()> method, ends in the Opera namespace, and
can be called with C<O.[method]([params]);> where C<O> is the variable containing
the Opera instance.

=head1 STATIC METHODS

=head2 C<new(opt)>

Class constructor.
Accepts an object literal with some configuration
options.

=head3 Parameters

=over 4

=item C<driver>

Driver name.
Right now we only have support for the YUI framework, so the
only allowed value is C<yui>. Mandatory.

=item C<base_url>

Base URL where the JavaScript libraries and scripts are
located. Mandatory.

=item C<minified>

String to append to filenames for using the minified versions of
modules. Optional.

=back

=head1 INSTANCE METHODS

=head2 C<addVariables(variables : Object)>

Same as calling C<variables(variables)>, except that existing variables won't
be removed.

=head2 C<config([config])>

Getter/setter for the main class configuration.
The optional C<config> argument is an object literal,
the usual properties are the ones described in the
constructor. See C<new()>.

=head2 C<extend(obj [, methods])>

Generic way of adding new methods in the main Opera namespace.

Injects all the methods listed in the C<methods> parameter
and present in C<obj> in the main Opera namespace.
When C<methods> is not provided, imports all the methods listed in
C<obj.EXPORT>.

=head2 C<loadDriver(driverName)>

Inject the exportable methods defined in the driver in the main Opera namespace.

Extends the main Opera namespace via C<extend()> importing
all the methods listed in the driver C<EXPORT> property.

=head2 C<variables([variables])>

Getter/setter for additional variables to set within the
instance.
This is a useful method for passing values from the DML files.
C<variables> is an object literal.

=head1 SEE ALSO

=over 4

=item Drivers, something like C<opera-driver-yui.js>.

=back

=head1 AUTHOR

Edoardo Sabadelli <edoardos@opera.com>

=head1 LICENSE AND COPYRIGHT

Copyright (c), 2009 Opera Software ASA.
All rights reserved.
*/