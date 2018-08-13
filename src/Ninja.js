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
			      var templates = /<%([^%>]+)?%>/g;
			      var operations = /(^( )?(if|for|else|switch|case|break|var|try|catch|finally|console|{|}))(.*)?/g,
			        code = 'var r=[];\nvar katana = this;\n',
			        cursor = 0,
			        match,
			        html = ninja.template.innerHTML;

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
			        return new Function(code.replace(/[\r\t\n]/g, '')).apply(ninja.data);
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
