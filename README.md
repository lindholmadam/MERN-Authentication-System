
Commands created in the root package.json file

# Terminal commands to run app from root directory 
npm run client (run frontend)
npm run server (run backend)
npm run dev (run frontend + backend concurrently)

# Terminal commands to import or destroy test-data from the seedar-script to database
npm run data:import
npm run data:destroy










# Register and login - https://www.youtube.com/watch?v=7Q17ubqLfaM ( good explanation of JWT )
Authentication vs authorisation
# Authentication - loging a user in
Make sure that the username and password is correct
# Authorisation
Making sure that the specific user who sends the request to you server - is THE SAME user that acually loged in during the Authentication process. It's autherising that THIS user has access to THIS particuler system.
This is done by session...
You have a session ID that you send down in the cookies of the browser,
then everytime the user makes a request, they send that session ID up to the server,
the server then checks it's memory and says: " ok, what user has this session ID? ",
the server finds that particular user and then does the actuall authorisation to make sure the user has access.
# JWT
BUT, insted of using these cookies it uses a json webtoken to do the authorisation.






# Use ES modules (ECMAScript modules) in the backend
To use ES modules in the whole node-project for consistensy - "type": "module" is added in the root package.json file

Why is this good?:
1. Consistent module system:
When working with modern JavaScript codebases that use ES modules on the frontend (in browsers), using the same module system in your Node.js backend can provide consistency across your entire project. This avoids the need for code transformations or module bundling specifically for the backend.
2. Improved code organization: 
ES modules provide a more concise and expressive syntax for importing and exporting functionality between modules. The import and export statements make it easier to understand module dependencies and create a more structured codebase.
3. Static analysis and tooling: 
ECMAScript modules allow for static analysis of dependencies, which enables better tooling support such as code editors with autocompletion, type checking, and module resolution. Popular tools like ESLint, TypeScript, and bundlers like webpack have excellent support for ES modules.
4. Support for top-level await: 
Enabling ECMAScript modules also allows the use of top-level await in your Node.js project. This can simplify asynchronous code by allowing asynchronous operations at the top level without needing to wrap them in an immediately invoked function expression (IIFE) or using other workarounds.
5. Future-proofing: 
As the JavaScript ecosystem continues to evolve, ES modules are the standardized module system specified in ECMAScript. By adopting ES modules in your Node.js project, you align with the industry standard and ensure compatibility and future-proofing for your codebase.





# How the backend folder uses the node_modules + package.json in the root directory
By default, Node.js looks for the node_modules directory in the following locations:
1. The local node_modules directory in the same directory as the current module file.
2. The parent directory's node_modules directory.
3. The parent's parent directory's node_modules directory.
And so on, all the way up to the root directory.

This means that when you run your backend code located in the backend folder, Node.js will first look for the required modules in the node_modules directory of the backend folder itself. If it doesn't find the module there, it will continue searching in the parent directory's node_modules directory, which is the root directory in this case.







 # Why we use a proxy server
 By specifying a proxy server in the frontend's package.json, you can simplify the development process by avoiding CORS issues during local development. This is particularly useful when you have a separate backend server running on a different port than your frontend.
 
 When using fetch() we don't wanna type the full adress like "fetch('http://localhost:5000/api/users')"
 We make a proxy server in package.json (frontend) to only need fetch('/api/users')
    "proxy": "http://localhost:5000"


