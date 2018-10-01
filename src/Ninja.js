/**
 * @author      Joseph Evans <joeevs196@gmail.com>
 * @since       03/08/2018
 * @version     2.0.4
 * @file        The purpose behind this javascript file is to implement a highly
 *              minimal rendering engine which can be run within the web browser.
 *              Due to the preprocessing abilities, you can have JSX like syntax
 *              within your ninja templates. I believe that many React developers
 *              may actually quite like that!
 * @copyright   (c) 2018 copyright holder all Rights Reserved.
 *              Permission is hereby granted, free of charge, to any person obtaining a copy
 *              of this software and associated documentation files (the "Software"), to deal
 *              in the Software without restriction, including without limitation the rights
 *              to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *              copies of the Software, and to permit persons to whom the Software is
 *              furnished to do so, subject to the following conditions:
 *
 *              The above copyright notice and this permission notice shall be included in all
 *              copies or substantial portions of the Software.
 *
 *              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *              IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *              FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *              AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *              LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *              SOFTWARE.
 * @see         The render method below was NOT of my own work, I've simply taken code that can be
 *              found here (http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line)
 *              I've simply plugged the same/similar code in with my own. Therefor I cannot take
 *              credit of how the rendering is actually executed in any way shape or form.
 *
 * @update      The purpose of this file is to allow for simple to do rendering, with Ninja.v2.js
 *              the core function that is responsible for rendering any DHTML is done using code from
 *              the url above. This means that there's more support for JSX-like syntax which as we all
 *              know, many front end developers love, as it's a blend of both JavaScript and HTML.
 *              In turn with the modification, this also means that there's a fair bit less source code,
 *              so UNLIKE most updates where code and features are added, this update has effectively
 *              removed code, and 'changed' the functionality & features behind this template engine.
 *
 * @update      Included the ability to parse another template into another one.
 *
 * @update      Included a render async method, this will simply take advantage of set timeout.
 *
 * @update      Included a lot more documentation & debugging tool(s).
 */



/**
 * You may be wondering why I went with the name Ninja, and it's quite simple
 * the point is to render templates in such a way that you don't even notice
 * it happening in the firs place.
 *
 * It may also be worth stating, the point behind this template engine is to just render
 * the DHTML in such a way that there's as little fuss and background processing going on
 * as possible.
 *
 * After all, you are Ninja now, you must be fast, silent and most of all deadly.
 *
 * A Ninja must only carry what Ninja needs, a Ninja does not carry additional accessories,
 * that such as storing the current state of the situation, the Ninja only does as commanded.
 */

/**
 * @global
 * @class  Ninja
 * @desc   Ninja is a mighty warrior that will provide a service that allows
 *         for very fast, accurate and simple methods for rendering your DHTML.
 *
 */
function Ninja () {
  if (Ninja.Sensai != null){
    return Ninja.Sensai;
  }


  /**
   * @private
   * This is a group of the finest warriors, this group of warriors is only accessible
   * to the Sensai.
   */
  var ninjas = {};

  /**
   * @private
   * This allows Ninja to see his errors, his past mistakes, this allows Ninja to
   * learn and become better warrior.
   */
  var debug = false;

  /**
   * @private
   * @function ninjaLog
   * @param    {Error} error
   * @desc     This allows Ninja to study his mistakes, his ways of error(s).
   */
  var ninjaLog  = function (error) {
    if (debug) {
      try {
        console.log('\n===================');
        console.log('=== NINJA ERROR ===');
        console.log(error);
        console.log('=== NINJA ERROR ===');
        console.log('===================\n');
      } catch (NoAccessToConsole) {
        // There is nothing more that cna be done ninja.
      }
    }
  };

  /**
   * @private
   * This is how the Sensai locates these warriors, he must take care of his warriors in order
   * for them to take care of him.
   */
  var ninjaTemplates = document.querySelectorAll("[type='application/ninja']");


  /**
   * You see, there is a sign up process, in order for a Ninja to be classified as a success,
   * he must first pass the test that the Sensai has put in place.
   */
  for (var i = 0, s = ninjaTemplates.length; i < s; i ++) {
    var ninjaTemplate = ninjaTemplates[i];
    var name = ninjaTemplate.getAttribute("name");
    var output = ninjaTemplate.getAttribute("output");

    if (name != null && output != null) {
      ninjas[name] = {};
      ninjas[name].template = ninjaTemplate;
      ninjas[name].output = document.querySelector(output);
      ninjas[name].data = null;
    } else {
      throw new Error("The Sensai will not be happy with this ninja." +
        "\nIn order to join our ranks little one, you must first define yourself with a name." +
        "\nYou must also have a place to rest, now please state a name " +
        "and a place to output your energy snesai." +
        "\n\nThe template tag must have an output attribtue and a name attribute, " +
        "the name should be a simple string, it can contain spaces if you like. Additionally, " +
        "the output attribute should be a query string to a specific element. ");
    }
  }


  /**
   * @private
   * @function samurai
   * @param    {String}   html
   * @param    {*}        data
   * @return   {Function}
   * @desc     You see Ninja, even you will need the help of a samurai
   *           from time to time as it is a well known fact that the samurai
   *           are strong and mighty warriors.
   */
  var samurai = function (html, data) {
    var templates = /<%([^%>]+)?%>/g;
    var operations = /(^( )?(if|for|else|switch|case|break|var|try|catch|finally|console|self|{|}|;|:|[|]))(.*)?/g,
      code = 'var r=[];\nvar katana = this;\nvar self = new Ninja();\n',
      cursor = 0,
      match;

    var add = function(line, js) {
      js  ? (code += line.match(operations)
        ? line + '\n' : 'r.push(' + line + ');\n') :
        (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
      return add;
    }

    while (match = templates.exec(html)) {
      add(html.slice(cursor, match.index))(match[1], true);
      cursor = match.index + match[0].length;
    }

    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
  };


  /**
   * @public
   * You see Ninja, this is what you must become, this is how other people may see you.
   *
   * As you are now Ninja, you must provide a set of services, but you must not give away any
   * important information.
   */
  var publicProperties = {

    /**
     * @public
     * @function getTemplate
     * @param    {String} name
     * @return   {*}
     * @desc     The purpose of this method is to allow Ninja to simply reflect and view
     *           himself.
     */
    getTemplate: function (name) {
      try {
        return ninjas[name];
      } catch (SomeError) {
        ninjaLog(SomeError);
      }
    },

    /**
     * @public
     * @function getData
     * @param    {String} name
     * @return   {*}
     * @desc     The purpose of this method allows Ninja to see what data
     *           has been assigned to which target.
     */
    getData: function (name) {
      try {
        if (ninjas[name] != null) {
          return ninjas[name].data;
        }
      } catch (SomeError) {
        ninjaLog(SomeError);
      }
    },

    /**
     * @public
     * @function getOutPut
     * @param    {String} name
     * @return   {*}
     * @desc     The purpose of this method is to allow Ninja to review what he
     *           has done.
     */
    getOutPut : function (name) {
      try {
        if (ninjas[name] != null) {
          return ninjas[name].output;
        }
      } catch (SomeError) {
        ninjaLog(SomeError);
      }
    },

    /**
     * @public
     * @function setData
     * @param    {String} name
     * @param    {*}      data
     * @desc      The purpose of this method is to simply allow Ninja to set the data
     *            that is assigned to his given target.
     */
    setData: function (name, data) {
      try {
        ninjas[name].data = data;
      } catch (NoSuchPropertyExists) {
        ninjaLog(NoSuchPropertyExists);
      }
    },

    /**
     * @public
     * @function setOutput
     * @param    {String} name
     * @param    {*}      output
     * @desc     The purpose of this method is to simply allow Ninja to set the
     */
    setOutput: function (name, output) {
      try {
        ninjas[name].output = output;
      } catch (NoSuchPropertyExists) {
        ninjaLog(NoSuchPropertyExists);
      }
    },

    /**
     * @public
     * @function setTemplate
     * @param    {String} name
     * @param    {*}      template
     * @desc     The purpose of this method is to simply allow Ninja
     *           to create a new target.
     */
    setTemplate: function (name, template) {
      try {
        ninjas[name] = template;
      } catch (NoSuchPropertyExists) {
        ninjaLog(NoSuchPropertyExists);
      }
    },

    /**
     * @public
     * @param  {String} xml
     * @param  {*}      data
     * @desc   This will allow Ninja to simply execute his given task without
     *         having to provide the result(s) instantly.
     */
    parse: function (xml, data) {
      try {
        return samurai(xml, data);
      } catch (SomeError) {
        ninjaLog(SomeError);
      }
    },

    /**
     * @public
     * @function renderAsync
     * @param    {String}   name
     * @param    {Function} fnc
     * @desc     This is where Ninja will attempt to provide some results
     *           without preventing fellow warriors from doing their job.
     */
    renderAsync: function (name, fnc) {
      setTimeout(function() {
        publicProperties.render(name, fnc);
      }, 0);
    },

    /**
     * @public
     * @function render
     * @param    {String}   name
     * @param    {Function} fnc
     * @desc     This is where Ninja must prove himself, Ninja must
     *           provide some results.
     * @see      http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line
     */
    render: function (name, fnc) {
      var ninja = ninjas[name];
      if (ninja != null) {
        if (ninja.data != null) {
          ninja.output.innerHTML = samurai(ninja.template.innerHTML, ninja.data);
          if (typeof fnc == "function") {
            fnc();
          } else if (fnc != null) {
            throw new Error("The Sensai will not be happy with this ninja." +
              "\nThere is only a certian format in which is accepted, the provided data " +
              "was not the correct format.\n\nThis method accepts a string, " +
              "followed by a function(or null) and nothign else.");
          }
        }
      }
    },

    /**
     * @public
     * @function toggleErrorLog
     * @desc     This method will allow Ninja to see whether or not
     *           he would like to see the ways of his own mistakes.
     */
    toggleErrorLog: function () {
      debug = !debug;
    }
  };


  /**
   * Ah, I see Ninja, The student has become the master.
   */
  if (Ninja.Sensai == null) {
    Ninja.Sensai = publicProperties;
  }

  return Ninja.Sensai;
}
