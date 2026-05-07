# Employee Performance Analytics Dashboard

## 📌 Overview
This is an Angular standalone dashboard that visualizes employee performance data using charts and a data table.

## 🚀 Features
- Angular standalone components
- JSON Server mock API
- Charts (Bar, Line, Pie, Heatmap)
- Server-side pagination & sorting
- Date range filtering
- Drill-down interaction
- Responsive UI

## 🧱 Architecture
- Smart component: Dashboard
- Dumb components: Charts
- Shared folder for services, models, pipes
- Typed HTTP service layer

## ⚙️ Setup

1. Install dependencies:
   npm install

2. Run JSON Server:
   npx json-server --watch db.json --port 4000

3. Run Angular:
   ng serve

## ⚠️ Trade-offs
- Used JSON Server (not real backend)
- Limited unit tests
- Charts are basic (can be enhanced)

## 📦 Tech Stack
- Angular
- Angular Material
- Chart.js
- RxJS