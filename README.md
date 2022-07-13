# Svelte Showcase

This is a little demo application that I put together as an excuse to play with Svelte and see what it can do.

---

# Running it

The program makes use of a JSON Server to provide a development backend / REST API.  To start both the Svelte app server and the JSON Server use:
```
npm run dev
```
The project has been configured with npm-p to allow parallel running of commands, so the "dev" command will start both servers.

The Svelte (UI) runs on http://localhost:8080

You shouldn't need to access the JSON Server directly, but if you want to, it runs on http://localhost:4200

---

# Credentials

When you run the application, it will prompt you with a login screen.  The credentials for this are:

Username: **guest**  
Password: **password**

Username: **admin**  
Password: **password**

The *admin* user will see an extra tile after they login for User Administration.  This will take you to a screen where you can Add, Edit and Delete users.

The *guest* user does not have access to this screen.  (So yes, currently, a guest can not reset their own password as that is part of the Edit screen.  It's just a demo app, cut me some slack.)

---

# Features

I've been programming in Angular since version 2.0 so the approach that I took was to take a "problem" or pattern that I used in Angular and to see how it could be done in Svelte.  Would it take more code, or less?  Would it be easier to read and follow, or would it be cryptic and hard to understand?  Some of these features are then just ideas that I got while working with Svelte than I felt like trying out.  
So here's a partial list of things you can find in the Showcase application.

## JWT handling

One pattern I used in Angular was an HTTPInterceptor to extract a JWT (http://jwt.io) from an HTTPResponse header and then store it in a Service which I could then use whereever I needed a value from it.  The service took care of decoding and parsing the JWT.  The Interceptor would also add the previous token to the next API call's request headers so that we could echo it back to the server.  In this way, the server could ensure that no extra requests were being sent and that the token hadn't been tampered with.

For the Svelte application, this was done with two files.  The first is *api.js*, which is a wrapper around the standard JavaScript fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).  It exports methods for GET, POST, DELETE and PUT.  Internally, these then delegate to a wrapper method around the fetch() which takes care of adding the JWT to the request if there is one in the store and extracting the JWT from the response and adding it to the store.  The second file is the store which is about as simple as you can get.  The *jwtStore.js* file contains two stores.  The first holds the "raw" (encoded) token.  The second store is derived from the first one and decrypts the token and serves it up as an object that can be examined and used.
```
export const jwToken = writable(null);  
export const parsedJWT = derived(jwToken, $token => $token ? jwt_decode($token) : {});
```
Those two lines of code replace an Angular service that had quite a few more lines to it!

## Internationalization (i18n)

Whether you're using the Angular default or another library like Transloco, i18n in Angular is pretty straightforward.  You create a JSON file for your strings, duplicate it for every language you want to support and just change the values for the keys.  Useing the **svelte-i18n** (https://github.com/kaisermann/svelte-i18n) library you can accomplish basically the same thing.  The syntax for how you use it in your components is a little different, but it's pretty straightforward.

One "problem" that Angular finally solved with v14 (I think it was 14?) was a consistent means to set and internationalize the browser tab title.  So that was a "problem" I wanted to see if I could solve in Svelte.  This was a little more complicated than I had hoped it would be, but the end result was something that I was quite satisified with.

The first piece was to make use of the <svelte:head> directive in my *App.svelte* file to provide the title, which is based on a value obtained from a store.  This takes care of setting the title whenever the store changes -- whether that's due to a language change or a navigation change.  The trick then was simply how to set the value?  
```
<svelte:head>
	<title>{$translatedPageName}</title>
</svelte:head>
```  
I wanted to make setting the value as simple as possible, so I created a store where you could set a key that I would then use.  Since this is just a simple, writable store, it means that in order to handle navigation, I simply need to update the store in the code for each "page" component, like so:  
```
$pageNameKey ="home";
```  
I then made use of a derived store (the translatedPageName that we use in the svelte:head) to do the translation, if neccessary.  Instead of being derived from a single store, it's derived from the pageNameKey, the locale and the i18n dictionary.  Any time any one of these items changes, the value of the translatedPageName gets re-calculated and the <title> updates!  The code for the two stores is in *titleStore.js*.

Similar to the JWT solution, the Svelte store proves to be very powerful feature.  They provide the *singleton* behaviour of an Angular Service, but generally require much less code to write.  Instead of adding them to a component via dependency injection, you simply import them and use them with $name-of-store.

## CSS Variables for theming

This wasn't something I've done before in Angular, but rather, something that I just wanted to play with and see how it works.  The basic idea was "how easy/hard would it be to implement light/dark themes using CSS Variables?"  As an added bonus, I also wanted to see if I could somehow make it cleaner with SASS.

The result works well and doesn't feel too "clunky".  Basically, the solution involved only a few parts.

In the *global.css* file, I defined my CSS variables.  I then made a *global.scss* file where I assigned each of those CSS variables to a SASS varible (for ease of use, because the CSS variable syntax is kind of cumbersome).  Then, I just needed to add some code to toggle the modes, which is just a simple assignment to the CSS variables to change their values.  The code for the re-assignment was done in the *Header.js* since that's where I put the toggle button.  When you click the button, the CSS variables are updated via JavaScript.  The SASS variables (more like an alias, really) gets updated and the code then updates in the template to use the new values.

I used a similar trick (again in the *Header.js*) to space out the icons in the header.  I wanted to left-justify them but space them out evenly.  So I defined a max-width based on the number of buttons present.  This number is another CSS variable that I use in a CSS calc() to determine the max-width of a *div* element which I then use a flex "space-between" on.  I'm sure there are other (probably simpler) ways to accomplish this, but it was mostly a proof-of-concept for ways in which to use CSS variables.  The relevanet code is:
```
    $: if ($currentUser) {
        let root = document.querySelector(':root');
        root.style.setProperty('--header-icons',  4);
    } else {
        let root = document.querySelector(':root');
        root.style.setProperty('--header-icons',  2);
    }
```
This uses the Svelte "make statment reactive" syntax of **$:** to check if a user is logged in or not.  If they are logged in, then there are 4 buttons present and if the user is not logged on, then only 2 buttons will be present.  If this were a "real" application, I'd probably have an object with a bunch of booleans to track the on/off state of each button and have code that counts how buttons are currently visible.  This button state would be a store and so I'd use that instead of looking at the $currentUser.

## User Administration

The intent of this demo was to test the various REST operations: GET, POST, PUT and DELETE.  I also wanted to see how easy/hard it was to do dialogs in a Svelte application.  This was based on something I did over a year ago, so I don't recall where I got the dialog code from (sorry, would attribute if I could!).

One important note: Although it would be nice to populate the Edit dialog with the user's password, the password is hashed via a 1-way hash so we can't decrypt it.  Since we're using the JSON Server as our backend, a hash makes more sense since we can simply compare the hash in the database with the hash of the user's entered password without needing to decrypt anything.  The drawback is that if you invoke the Edit user function, you have to provide a "new" password.  The password field doesn't have any "rules" on it for length, so you can actually leave it blank for "no password" if you want, so long as the Confirmation field is the same.

At any rate, the dialog takes a callback method as one of it's inputs and invokes it when the user clicks OK.  This passes the data back to the original page where we can call the appropriate HTTP method.  I "complicated" things by re-using the same dialog for both Create and Edit.  Mostly because I wanted to see if I could.  Because of the use of callbacks and the need to have *async* functions for calling the HTTP methods, this component has a lot of small methods.  Definitely some possibilities for further breaking things down into small components with which to compose the screen.  (For example, the *Edit* and *Delete* buttons could be made into their own components that could then take ownership of the code for popping open the dialog and calling the HTTP method that corresponds to the button.)

Currently, the only difference between an Admin and a non-Admin user is whether they have access to this screen.  Ideally, both users would have access; however, for a non-Admin user, they'd only see themselves in the list or they'd see everyone, but wouldn't have any actions available.

## Dungeons and Dragons Character Sheet

This demo is all about reactivity and connectedness.  Because this could be a huge page, I wanted to break it down into re-usable components.  The primary statistics are a prime example.  I wanted to make a reusable component that would frame and label each input as well as calculate and show the bonus (or penalty) associated with the value.  However, as most of the values on the character sheet are derived from these statistics, I wanted their "home" to be on the main "page" component.  In Angular, this would mean having an @Input on the child control and another @Output and code to emit the value as it was changed.  With Svelte, I was able to simply bind the parent's property to the child component and then in the child component, bind it's value property to the input.  And that was all it took!

There are a lot of "$:" declarations in the main page.  These all make secondary variables that are dependent on other properties or functions that use other properties.  In the case of the Proficiency bonus, it actually reacts to a reactive property (Level) that itself is reactive to the XP value.  Type in some experience points and the level will update.  As the level updates, the proficieny bonus also updates!  (And yes, I could have just had the proficiency bonus react to the XP change, but I was curious if you could react to a reactive property so this was a proof-of-concept and it worked!)
