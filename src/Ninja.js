/**
 * @author      Joseph Evans <joeevs196@gmail.com>
 * @since       03/08/2018
 * @version     2.0.1
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
   * You see ninja, even you will need the help of a samurai from time to time as
   * it is a well known fact that the samurai are strong and mighty warriors
   */
  var samurai = function (html, data) {
    var templates = /<%([^%>]+)?%>/g;
    var operations = /(^( )?(if|for|else|switch|case|break|var|try|catch|finally|console|self|{|}))(.*)?/g,
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
    getTemplate: function (name) {
     return ninjas[name];
    },

    getData: function (name) {
      if (ninjas[name] != null) {
        return ninjas[name].data;
      }
    },

    getOutPut : function (name) {
      if (ninjas[name] != null) {
        return ninjas[name].output;
      }
    },

    setData: function (name, data) {
      ninjas[name].data = data;
    },

    setOutput: function (name, output) {
      ninjas[name].output = output;
    },

    setTemplate: function (name, template) {
      ninjas[name] = template;
    },

    parse: function (xml, data) {
      return samurai(xml, data);
    },

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
