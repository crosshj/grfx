
## Top Bar

Many of the tool options in `top-bar` are inspired by:
- [pixlr](https://pixlr.com/e/#editor)
- [photoshop menus](https://www.lifewire.com/navigating-the-adobe-photoshop-menu-bar-4091953)

## How to add a new form
1. create an handlebars(hbs) in menus/forms.
2. create a property in menus/forms.js that matches the file
 from first step.

3. from top index html there should be a value on the option 
you want to trigger the menu. 

4. take that value and go to core/actions.js and add a
handler. add handler for a modal 
- name it like 'menu' + modal name

5. also in core/actions.js, add a handler for the form submit;
this should match what the form has for data-action
 - name it like 'menu' + data-action


## Development with fiug.dev

### get started
In terminal, type `git clone crosshj/grfx` and press ENTER.  Note: you may have to update the repository address to reflect your fork.   

### to test
Type `preview tests.html` in terminal and press ENTER.
To add tests, follow example at `tests.html` and `core/state.test.js`

### to preview
right click on `index.html` and select `Open in New Window`
