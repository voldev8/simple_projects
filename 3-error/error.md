Here are three common error types:

- _SyntaxError:_ This error will be thrown when a typo creates invalid code — code that cannot be interpreted by the compiler.
  When this error is thrown, scan your code to make sure you properly opened and closed all brackets, braces, and parentheses and
  that you didn’t include any invalid semicolons.
- _ReferenceError:_ This error will be thrown if you try to use a variable that does not exist. When this error is thrown,
  make sure all variables are properly declared.
- _TypeError:_ This error will be thrown if you attempt to perform an operation on a value of the wrong type. For example,
  if we tried to use a string method on a number, it would throw a TypeError.

Debugging Review

You just learned a lot of techniques for helping you get unstuck in all debugging situations. Congratulations!
Let’s synthesize everything you learned into one debugging process.

- Is your code throwing errors? If so, read the error stack trace for the type, description, and location of the error.
  Go to the error’s location and try to fix.
- Is your code broken but not throwing errors? Walk through your code using console.log() statements. When unexpected
  results occur, isolate the bug and try to fix it.
- Did you locate the bug using steps 1 and 2, but can’t fix the bug? Consult documentation to make sure you are using
  all JavaScript functionality properly. If you are still stuck, Google your issue and consult Stack Overflow for help.

Read solutions or post your own Stack Overflow question if none exist on the topic.

```javascript
try {
  throw Error('This error will get caught');
} catch (e) {
  console.log(e);
}
// Prints: This error will get caught

console.log('The thrown error that was caught in the try...catch statement!');
// Prints: 'The thrown error that was caught in the try...catch statement!'
```
