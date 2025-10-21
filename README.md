# 🔤 String Analyzer API

The **String Analyzer API** is a RESTful backend service that allows users to analyze, store, retrieve, update, and delete string data.  
It’s built with **Node.js**, **Express**, and **MongoDB** to demonstrate CRUD operations, data validation, and basic string analysis.

---

## 🚀 Features

- Analyze and store strings in a MongoDB database  
- Retrieve all strings or fetch by value  
- Update existing strings  
- Delete strings by value  
- Simple, fast, and well-structured REST API

---

## 🧱 Tech Stack

- **Backend Framework:** Node.js + Express  
- **Database:** MongoDB + Mongoose  
- **Environment Management:** dotenv  
- **Dev Tool:** nodemon  

---

## 📁 Folder Structure

project/
├── controllers/
│ └── string-controller.js
├── routes/
│ └── analyzer-route.js
├── database/
│ └── db.js
├── .env
├── package.json
└── server.js


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/veradanicode/string-analyzer-api.git
cd string-analyzer-api
2️⃣ Install dependencies
bash
Copy code
npm install
3️⃣ Create an .env file in the project root
bash
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
4️⃣ Start the development server
bash
Copy code
npm start
Server will run at:
👉 http://localhost:5000

🧩 Dependencies
Package	Description
express	For handling HTTP requests and responses
mongoose	For MongoDB data modeling
dotenv	For environment variable management
nodemon (dev)	Auto-restarts the server during development

Install manually (if needed):

npm install express mongoose dotenv
npm install --save-dev nodemon
🧠 API Endpoints
1️⃣ Create & Analyze String
POST /strings
Request Body:

```json
{
  "string_value": "hello world"
}
Response (201 Created):
```

```json
{
  "message": "String analyzed and saved successfully",
  "data": {
    "string_value": "hello world",
    "length": 11,
    "vowels": 3,
    "consonants": 7,
    "spaces": 1
  }
}
```
2️⃣ Get All Strings
GET /strings
Response (200 OK):

json
Copy code
[
  {
    "string_value": "hello",
    "length": 5,
    "vowels": 2
  },
  {
    "string_value": "world",
    "length": 5,
    "vowels": 1
  }
]
3️⃣ Get String by Value
GET /strings/:string_value
Example:
/strings/hello
Response (200 OK):

json
Copy code
{
  "string_value": "hello",
  "length": 5,
  "vowels": 2,
  "consonants": 3
}
Error (404 Not Found):

json
Copy code
{ "error": "String not found" }
4️⃣ Filter by Natural Language
GET /strings/filter-by-natural-language?query=hello
Response (200 OK):

json
Copy code
[
  {
    "string_value": "hello",
    "language": "English"
  }
]
Error (422 Unprocessable Entity):

json
Copy code
{
  "error": "Query parsed but resulted in conflicting filters"
}
5️⃣ Delete String
DELETE /strings/:string_value
Example:
/strings/hello
Success Response (204 No Content):

css
Copy code
(empty body)
Error (404 Not Found):

json
Copy code
{
  "error": "String does not exist in the system"
}
🌱 Example .env
bash
Copy code
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/stringAnalyzer
🧪 Testing with Postman
Open Postman or Insomnia

Set Base URL to: http://localhost:5000/strings

Test endpoints like:

POST /strings

GET /strings

GET /strings/:string_value

DELETE /strings/:string_value

Example test command (via curl):

bash
Copy code
curl -X POST http://localhost:5000/strings \
-H "Content-Type: application/json" \
-d '{"string_value": "hello world"}'
📘 Example Usage
Here’s a quick example of how the API works together:

bash
Copy code
# Create a new string
POST /strings
{ "string_value": "chatgpt" }

# Get all stored strings
GET /strings

# Get a specific string
GET /strings/chatgpt

# Delete a string
DELETE /strings/chatgpt
💻 GitHub Repository
🔗 https://github.com/veradanicode/string-analyzer-api

👨🏽‍💻 Author
Vera Daniel
💻 GitHub
🐦 Twitter / X
📧 veradanicode@gmail.com

