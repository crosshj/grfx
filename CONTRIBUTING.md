
## Top Bar

Many of the tool options in `top-bar` are inspired by:
- [pixlr](https://pixlr.com/e/#editor)
- [photoshop menus](https://www.lifewire.com/navigating-the-adobe-photoshop-menu-bar-4091953)

## How to add a new form
1. create an handlebars(hbs) in menus/forms.
2. create a property in menus/forms.js that matches the file from first step.
3. create a property in core/core.js in the modalData object, this is how we get data into handlebars template created above.
4. create a property in core/core.js in the modals object, the key should match the menu item string that you want to trigger the modal, the value should match the property you put in modalData(Step 3) and in forms/forms.js (Step 2).
