# Clever todo list

### [Deployment](https://clever-todo-list-ce95f.firebaseapp.com)

## Tech Stack
* React
* MUI
* Firebase
* TypeScript

## How to run the app

1. Clone this repository by running `$ git clone https://github.com/lnicepei/clever-todo-list`
2. Run `cd clever-todo-list`
3. Run `npm i`
4. Run `npm run dev`

## Other scripts

* `npm run lint` wil run [eslint](https://eslint.org/) in the source folder, checking for all files that match the following pattern `src/**/*.ts{,x}`

## How to add git hooks

* Run `npm run prepare`
* Add a hook. `npx husky add .husky/pre-commit "npm test"`, for instance

## Firebase snapshot
* <b>Tasks</b>
  * Stored as an array
  * Each user has their own tasks
  * You can modify a task. Create, Read, Update, Delete
* <b>Users</b>
  * Log in
  * Register
  * Use Google to see their tasks

## Folder structure
 * Project boilerplate was created using [vite](https://vitejs.dev/) 
