This is a very simple application written by Typescript, HTML, CSS (with form control and list group class from Bootstrap), and Mysql as a database.
### Backend part of the Todo list application
This is the backend part of the Todo list application. The frontend part can be found via this link: [Todo list-frontend part](https://github.com/Nguyen-Thi-HuyenK/Todos).
Together with the frontend to make a full application which allows users to add To-do tasks to the list. After entering the task, it will be saved to the database.
Users can delete the tasks by clicking on the trash bin icon, and the task will then be removed from the UI as well as from the database.
### Run the application
This application includes 2 separate repositories for frontend and backend code. First of all, you should clone both repositories to your local machine, then install all needed dependencies by running the below command in the command line:
```bash
npm install
```
#### Link: [Backend repository](https://github.com/Nguyen-Thi-HuyenK/Todos-server) 
- Start the server by running the below command in the command line:
```bash
npm run devStart
```
- Create .env file in the backend repository where you can store your DB_HOST, DB_USER, DB_PASSWORD.
#### Link: [Frontend repository](https://github.com/Nguyen-Thi-HuyenK/Todos)
- Start the application by running the below command in the command line:
```bash
tsc -p tsconfig.json --watch
```
Then go to the browser to use the application via the address: http://localhost:5500/Todos/index.html  
