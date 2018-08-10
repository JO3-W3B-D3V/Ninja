# Ninja School

Ninja is a front end template engine in the most simplistic of terms, **however** it is possibly among the smallest JavaScript template engine(s) around, it is near minimal, the purposes behind such a template engine are listed below:

  - Simplicity
  - Reliability
  - Speed

I developed Ninja for the above reasons, I found that **a lot** existing template engines were just **way** too over engineered, I mean they're cool and all, **but**, surely the soul purpose of a template engine is to render a template, nothing more, nothing less. I also thought that I'd just go with quite an _alternative_ theme with the naming conventions and what not, I thought it could be a bit of fun. The original thought process that made me think of the word 'Ninja' was down to the simple fact that I wanted to make something so small it require less than 200 or so lines of code, whilst being nearly as fast as possible, and maintaining a reasonable amount of functionality.

As they say, it's good to be a _'jack of all trades'_, but it's better to be a master of one, and that's essentially the desired outcome from Ninja, it doesn't do any event handling, it doesn't do 'x', 'y', or 'z', it simply looks at some template(s) and produces the HTML/DHTML, that's it. 

# More Information

As I am a full stack web developer, I typically develop the back end in such a way that it becomes either a microservice or an API. While trying to follow the rules to defining a restful system, I decided that rendering should be done on the front end, one may debate that rendering _should_ be done on the back end, which is a fair debate. **But**, personally I think that it should be done on the front end, the way I see it is that what the user sees is a part of the front end application, therefore to me this makes a bit more logical sense.

When using Ninja templates, you must be aware of a few minor details, one being how ninja will pick up a template, in order for Ninja to automatically detect that it's a valid template, you must define a script tag like so:

```html
<ul id="listOutput"></ul>
<script type="application/ninja" name="list" output="#listOutput">
  for (var i = 0, s = katana.list.length; i < s; i ++) {
    if (katana.list[i].length > 3) {
        render.add("<li>" + katana.list[i] + "</li>");
    } else {
        render.add("<li>tooSmall</li>");
    }
  }
</script>
```

##### JSX-_Like_ Implementation

You can also run the code through a preprocessor and have more JSX-_like_ syntax, to do so you can write your Ninja template like so:

```javascript
for (var i = 0, s = katana.list.length; i < s; i ++) {
  if (katana.list[i].length > 3) {
    render(<li>{{katana.list[i]}}</li>);
  } else {
    render(<li>tooSmall</li>);
  }
}
```

##### More Information Continued

Now, you may be wondering what all of this means, so here's a brief explanation, Ninja will automatically collect the templates when a Ninja object is created ```var ninja = new Ninja();```. Each template must have a name, this way you can refer to it elsewhere in the code, as Ninja can have many templates on the same page, and you may want to render 'x' template at 'z' time, you can access templates in the JavaScript via the template name. Then as you can see, there needs to be an output too, the way in which shit is developed, you can store the output attribute as a query string, this way in JavaScript it just needs to run ```document.querySelector(x);```.

When executing a template, you must be aware that there are a few reserved words and they are:

  - **katana** - This refers to the data object that has been passed into the given template.
  - **render** - This refers to an object which is used to add the DHTML to the output, additionally this object stores the following:
    - **add** - A function that will add the DHTML to the processed/desired DHTML output.
    - **compile** - A function that will store the code that was executed by Ninja.

Due to how simple this implementation is, it's incredibly fast and reliable, from _brief_ testing, I've noticed how it executes in IE8, and may even work for IE7 and older provided you have some polyfiller for ```querySelector``` and ```querySelectorAll```.


# Version 2
With version two the core functionality is _slightly_ different, the syntax is much more JSX oriented, if you’d like to see how the new version works, take a look at [this link](http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line).To create a template now though you need to use _slightly_ different syntax, like so: 

```javascript
<% for (var i = 0; i < katana.length; i ++) { %>
  <% var user = katana[i]; %>
    <div class="profile">
      <p><% user.name %></p>
      <hr/>
      <p><% user.age %></p>
      <hr/>
      <p><% user.job %></p>
  </div>
<% } %>

<br/><br/>
<% katana.length %>
```


# Contact
If you have any questions or suggestions, please contact me at [my personal email address](mailto:joeevs196@gmail.com).


# Todo
  - Documentation
  - Testing
  - Tidy Up
  - Contemplate Additional Features
      - After all this is meant to be as compressed, lightweight and as fast as possible.
  - etc.
