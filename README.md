## NodeJS File System

**Simple Node.js File System App**

This Node.js application allows you to create and view text files with timestamps. 

It features:
- File creation with timestamps
- Text file content viewing
- User-friendly interface with routes for:
    - Creating files
    - Viewing all files

## Render Deployment

Website URL: [NodeJS File System](https://nodejs-filesystem-32xx.onrender.com/)

- Create a new text file:  https://nodejs-filesystem-32xx.onrender.com/create
- View all files:  https://nodejs-filesystem-32xx.onrender.com/view

## Installation and Setup

1. Clone the repository:
```
git clone https://github.com/your-username/your-repo-name.git

cd your-repo-name
```

2. Install dependencies:
```
npm install express nodemon date-fns
```

3. Start the development server:
```
npm run dev
```

The server will start on port `3000` by default. You can access the application routes in your browser:

- Create a new text file:  http://localhost:3000/create
- View all files:  http://localhost:3000/view

Technologies Used:
- Node.js
- Express.js
- `fs` module(for file system operation)
- `date-fns` module (for date formatting)