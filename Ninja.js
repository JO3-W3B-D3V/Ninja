/**
 * @author      Joseph Evans <joeevs196@gmail.com>
 * @since       03/08/2018
 * @version     0.0.1
 * @file        The purpose behind this javascript file is to implement a highly
 *              minimal rendering engine which can be run within the web browser.
 *              Due to the preprocessing abilities, you can have JSX like syntax
 *              within your ninja templates. I believe that many React developers
 *              may actually quite like that!
 * @copyright (c) 2018 copyright holder all Rights Reserved.
 *            Permission is hereby granted, free of charge, to any person obtaining a copy
 *            of this software and associated documentation files (the "Software"), to deal
 *            in the Software without restriction, including without limitation the rights
 *            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *            copies of the Software, and to permit persons to whom the Software is
 *            furnished to do so, subject to the following conditions:
 *
 *            The above copyright notice and this permission notice shall be included in all
 *            copies or substantial portions of the Software.
 *
 *            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *            SOFTWARE.
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
   * You see Ninja, one of the most important things you can do is to plan ahead.
   */
  var preProcess = function (str) {
    if (typeof str != "string") {
      throw new Error("The Sensai will not be happy with this ninja." +
        "\nThere is only a certian format in which is accepted, the provided data " +
        "was not the correct format.\n\nThis method accepts a sting and nothign else.");
    }

    var preRender = "";
    var lines = str.split("\n");
    var renderRegularExpression = /\(([^);]+)\)/;
    var dhtmlRegularExpression = /{([^}}]+)}}/g;

    for (var i = 0, s = lines.length; i < s; i ++) {
      var line = lines[i];
      var target;
      try { target = line.match(renderRegularExpression)[1] }
      catch (Exception) { /* Do nothing Ninja, do not worry, this was a minor mistake */  }

      if (target != null && line.indexOf("render") >= 0) {
          var startOutputString = "render.add('";
          var endOutputString = "');";
          var outputLine = "";

          if (line.indexOf("{{") >= 0 && line.indexOf("}}") >= 0) {
            var dhtml = target.match(dhtmlRegularExpression)[0];
            var variableName = dhtml.replace(new RegExp("{", "g"), "")
                                    .replace(new RegExp("}", "g"), "");
            var startOfDHTML = target.substring(0, target.indexOf(dhtml));
            var endOfDHTML = target.substring(target.indexOf(dhtml) + dhtml.length, target.length);
             outputLine = startOutputString + startOfDHTML + "' + " + variableName + " + '" + endOfDHTML + endOutputString;
         } else {
            outputLine = startOutputString + target + endOutputString;
         }

         str = str.replace(line, outputLine);
      }
    }

    return str;
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

    render: function (name, fnc) {
      var ninja = ninjas[name];
      if (ninja != null) {
        if (ninja.data != null) {

          var samurai = function () {
            var katana  = ninja.data;
            var render = {value: '', add: function (x) { render.value += x; }};
            var preProcessed = ninja.template.innerHTML;
            try { preProcessed = preProcess(ninja.template.innerHTML); }
            catch (Exception) { /* Do nothing Ninja, do not worry, this was a minor mistake */ }
            var jujutsu =
            "render.compile = function () { \n " +
              "\n" + preProcessed +
              "\n return render.value;\n" +
            "};";
            eval(jujutsu);
            render.compile();
            return render.value;
          };
          ninja.output.innerHTML = samurai();
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
