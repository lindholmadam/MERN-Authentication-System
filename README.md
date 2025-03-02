
Commands created in the root package.json file

# Terminal commands to run app from root directory 
npm run client (run frontend)
npm run server (run backend)
npm run dev (run frontend + backend concurrently)

# Terminal commands to import or destroy test-data from the seedar-script to database
npm run data:import
npm run data:destroy






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


