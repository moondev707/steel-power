⚡ Steel Industry Power Analyzer

Analyze and visualize steel industry power usage from real CSV data using a modern full-stack web app.
📊 Features

    📁 Reads raw power data from CSV

    🔍 Filter data by:

        Date range

        Days of the week

        Power type (e.g. Usage_kWh, CO2, etc.)

        Load type (e.g. Maximum_Load, Light_Load)

    📈 View results in:

        List View: detailed records with date and day

        Summary View: aggregate statistics like sum, mean, min, max, median

    ⚙️ Built with:

        Backend: Node.js + Express

        Frontend: React.js

        CSV Parsing: csv-parser + moment.js

        API Requests: Axios

🧠 Tech Stack
Layer	Tech
Frontend	React, Axios, CSS
Backend	Express, Node.js
CSV Parser	csv-parser
Date Utils	moment
🚀 Getting Started
🛠️ Prerequisites

    Node.js (v18+ recommended)

    npm or yarn

⚙️ Backend Setup

    Go to the backend folder (or root if monorepo):

cd backend

    Install dependencies:

npm install

    Place your Steel_industry_data.csv inside the data/ folder:

/backend
  /data
    Steel_industry_data.csv

    Run the server:

npm start

    Server will run at: http://localhost:3001

🌐 Frontend Setup

    Navigate to the frontend folder:

cd frontend

    Install dependencies:

npm install

    Start the React app:

npm start

    App will run at: http://localhost:3000 (or whatever your dev port is)

🧪 Sample API Endpoints
1. Summary View

GET /power?view=summary&type=Usage_kWh&stat=mean

2. List View with Filters

GET /power?view=list&type=CO2(tCO2)&loadType=Maximum_Load&from=2018-05-01&to=2018-06-01

📁 Folder Structure

/backend
  index.js
  /data
    Steel_industry_data.csv

/frontend
  App.js
  /components
    FilterForm.js
    ResultView.js
  /api
    powerAPI.js

💡 Future Enhancements

    Add chart visualizations with Chart.js or Recharts

    Export filtered data as Excel

    Add login/auth for private access

    Deploy to Vercel + Render/Heroku

📄 License

MIT License — free for personal and commercial use.