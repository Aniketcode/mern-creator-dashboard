Steps to run 

***** Backend(Server)  *****
Step 1. Go to Server folder 
Step 2. npm install
Step 3. add your mongodb url
Step 4. npm run dev


***** Frontend  *****
Step 1. Go to Frontend folder 
Step 2. npm install
Step 3. npm run dev



***** Features *****
Backend:
 1. Clean architecture with proper folder structure
 2. Authentication Login,Signup using jwt,hashed password
 3. Role based Authentication User,Admin
 4. Admin controls users lists,credit etc
 5. Feed lists using redit & dev.to api 
 6. On login user get points, can save,report feed posts
 7. Global error handling
 8. Routing,controller,models featutres
 9. Mongodb database queries
 10. using express,cors,dotenv,jsonwebtoken,bcrypt etc  

Frontend:
 1. Clean architecture with proper folder structure
 2. Authentication Login,Signup pages with Logout
 3. State management using redux rtk query
 4. Proper form handling by helper functions
 5. Reusable components for inputs,heading,cards etc
 6. Login & Signup as Admin & User
 7. User Dashboard with Credit points cards,Saved posts ,Recent activities.
 8. User can save post , report post all are populated in user dashboard
 9. User can share feed post
 10.User can be mark profile completed if done check mark should be shown at username in navbar
 11.User can see only feed & perform save,report,share
 12.Responsive across all devices leverages with tailwindcss media queries 
 13.Clean & modular ui  
 14. Admin dashboard to manage users lists, recent activities of users, can add credits


***** Deployement Process *****

 Step 1. Add gitignore file at Frontend & Backend side to ignore env,node_modules etc
 Step 2. Added cors policy to server index file
 Step 3. Added some configuration in vite.config.js to ensure server work properly 
 Step 4. Push the code to github
 Step 5. Login to render --> choose web service for Backend & deploy the server with env variables 
 Step 6. Login to render --> choose  static service for Frontend & deploy with env variables if present
 Step 7. Copy Backend deployed & Frontend deployed url & paste to server env file also in frontend file if present
 Step 8. Redeploy by clicking button
 Step 9 . Now whatever changes will be done , it automatically pushed & deploy
 Step 10. Open frontend deployed url to browser and run gthe web app