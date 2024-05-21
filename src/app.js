import express from "express";
import { format } from 'date-fns';
import fs from 'fs'

const app = express();
const port = 3000;

// Styles for various HTML elements
const divStyle = `
    height:100%; 
    font-family:cursive; 
    display:flex; 
    flex-direction:column; 
    justify-content:center; 
    align-items:center
`;

const achorStyle = `
    text-decoration:none; 
    color: #000; 
    border: 1px solid; 
    padding: 5px; 
    border-radius: 5px
`;

const tableBorder = `
    border: 1px solid black; 
    border-collapse: collapse; 
    padding: 15px
`;

// Function to generate the home page content
const HomePage = (text) => {
    const home = `<div style= "${divStyle}">
        <h1>${text}</h1>
        <h3 style="color:green">Server running in port: ${port}<h3>
        <a href="/create" style="${achorStyle}">
            To Create text file
        </a>
        <p><a href="/view" style="${achorStyle}">
            To View all the text file
        </a></p>
    </div`

    return home;
}

// Function to generate the create page content
const createPage = (formateDate, data) => {
    const create = `<div style="${divStyle}">
        <h1 style = "color: green">File created successfully!</h1>
        <h2>Text file name: ${formateDate}.txt</f2>    
        <h3>${data}</h3>
        <hr/>
        <p><a href="/" style="${achorStyle}">Home Page</a><p>
    </div>`
    return create
}

// Function to generate the view page content
const viewPage = (textFile) => {
    const tableRows = (textFile.map((file, index) => {
        const fileContent = fs.readFileSync(`./time-stamp/${file}`,"utf8");
        return `
        <tr key = ${index}>
            <td style = "${tableBorder}">${file}</td>
            <td style = "${tableBorder}">${fileContent}</td>
        </tr>
        `;
    }));

    // Join the table rows using an empty string as the separator
    const tableBody = tableRows.join('')

    return `
    <div style= "${divStyle}">
        <table style = "${tableBorder}">
            <tr>
                <th style = "${tableBorder}">File Name</th>
                <th style = "${tableBorder}">Content</th>
            </tr>
            ${tableBody}
        </table>
        <p><a href="/" style="${achorStyle}">Home Page</a><p>
    </div>
    `
}

// Function to generate error message
const textError = (error) => {
    const err = `<div style = "${divStyle}">
        <p style = "color: red">${error}<p>
    </div>`
    return err;
}


// Route handlers
app.get("/", (req, res) => res.status(200).send(HomePage("Node.js File system")))

app.get("/create",(req, res) => {
    try {
        const formateDate = format(new Date(), "dd-MM-yyyy-HH-mm-ss");
        const filePath = `./time-stamp/${formateDate}.txt`;
        const date = `Current timestamp: ${formateDate}`

        fs.writeFileSync(filePath, date, "utf8")
        let content =  fs.readFileSync(filePath, "utf8")

        res.status(200).send(createPage(formateDate, content))
    }catch(err)
    {
        res.send(textError(err.message))
    }  
})

app.get("/view",(req, res) => {
    try {
        // Get all the files from the time-stamp directory
        const textFiles = fs.readdirSync("./time-stamp")
        res.status(200).send(viewPage(textFiles))
    }catch(err)
    {
        res.send(textError(err.message))
    } 
})

app.listen(port, () => console.log(`server running in ${port}`))