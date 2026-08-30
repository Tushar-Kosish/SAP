# 🚢 SmartEvac AI – Landside Container Evacuation & SAP TM Integration

![SmartEvac AI](https://img.shields.io/badge/SmartEvac%20AI-v1.0.0-0A6ED1?style=for-the-badge&logo=sap&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![SAP Horizon](https://img.shields.io/badge/SAP_Horizon-Theme-0A6ED1?style=for-the-badge&logo=sap&logoColor=white)

**SmartEvac AI** is an enterprise-grade, multi-agent AI system designed for real-time landside container evacuation, supply chain risk mitigation, and seamless integration with **SAP Transportation Management (SAP TM)**. Built with modern SAP Fiori Light Horizon design patterns, it empowers logistics operators, port authorities, and suppliers to dynamically reroute freight, predict bottlenecks, and maintain continuous supply chain visibility during severe port disruptions.

---

## ✨ Key Features

### 🤖 1. Multi-Agent AI Evacuation Intelligence
- **Autonomous Rerouting**: Real-time recalculation of container transport routes using live congestion, weather, and port gate bottleneck data.
- **Risk Assessment Engine**: AI agents evaluate environmental, geopolitical, and operational risk vectors across global trade lanes.
- **Decision Panel & Audit Logging**: Full transparency with AI decision rationale, confidence scores, and immutable audit logs.

### 🔐 2. Enterprise Role-Based Access Control (RBAC)
- **Role Isolation**: Strict separation between **Admin Control Center** and **Supplier Partner Interface**.
- **Admin Dashboard**: Full system oversight, live agent monitoring, SAP TM connection status, global fleet tracking, and World Bank SCM guidance.
- **Supplier Portal**: Streamlined view for freight operators, weather-overlay maps, shipment dispatches, and automated PDF export reports.

### 🗺️ 3. Interactive GIS Route & Weather Mapping
- **Leaflet Map Visualizations**: Interactive route comparison maps showing primary vs. alternate evacuation corridors.
- **Live Weather Overlay**: Real-time temperature, wind speed, precipitation, and severity alerts along active freight routes.
- **Workflow Stepper & Disruption Tracking**: Multi-step visual tracking of container evacuation milestones from port gate to inland depot.

### 🏢 4. SAP TM & Enterprise ERP Integration
- **SAP TM Client**: Seamless bidirectional synchronization with SAP TM OData services (`/SAP/TM/SO_DATA`).
- **Data Standardization**: Standardized freight units, transport orders, carrier assignments, and execution statuses.
- **Fallback Simulation Engine**: Embedded local mock server for offline capability and seamless development testing.

### 📊 5. World Bank SCM Risk Suite & Analytics
- **Supply Chain Risk Framework**: Comprehensive guidance tools based on World Bank logistics performance indices.
- **Recharts Analytics Engine**: Interactive charts for container throughput, delay cost projections, route optimization efficiency, and agent performance.

### 🎨 6. SAP Fiori Horizon Theme System
- **Dynamic Theme Engine**: Supports **SAP Light Horizon**, **Dark Horizon**, **Navy Control**, and **Emerald Logistics** color palettes.
- **PWA Ready**: Mobile-first responsive UI with custom install prompts, touch gestures, and bottom navigation sheets.

---

## 🛠️ Technology Stack

### Frontend (React / TypeScript)
- **Framework**: React 18 + TypeScript 5
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 3 + SAP Fiori Light Horizon CSS custom properties
- **Routing**: React Router DOM v7 (with animated route transitions via Framer Motion)
- **Mapping**: Leaflet 1.9 + React Leaflet
- **Charts & PDF**: Recharts, jsPDF, Canvas Confetti

### Backend (Python Service Engine)
- **Runtime**: Python 3.10+
- **API Engine**: Standard HTTP / Custom REST API (`app.py`, `backend_api.py`)
- **Database**: SQLite (`smartevac_local.db` via `database.py`)
- **Authentication**: JWT & Role Authorization (`auth.py`)
- **Evacuation Agents**: Custom multi-agent framework (`agents.py`, `ai_rerouting.py`, `models.py`)

---

## 📁 Repository Structure

```
SAP/
├── index.html                   # HTML Entry point
├── package.json                 # Frontend dependencies and npm scripts
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── firestore.rules              # Firebase Security Rules
├── Dockerfile                   # Docker deployment container configuration
├── public/                      # Static assets & PWA manifest
├── src/                         # React Frontend Application
│   ├── App.tsx                  # Root component, router & RBAC protection
│   ├── index.css                # Enterprise design tokens & SAP Horizon themes
│   ├── components/              # Reusable UI components
│   │   ├── Navbar.tsx           # Role-aware navigation header
│   │   ├── BottomNav.tsx        # Mobile navigation bar
│   │   ├── RouteMap.tsx         # GIS Leaflet route map
│   │   ├── SupplierWeatherMap.tsx # Interactive weather & GIS overlay map
│   │   ├── WorkflowStepper.tsx  # Evacuation progress stepper
│   │   ├── AIDecisionPanel.tsx  # AI agent reasoning panel
│   │   ├── RoleSwitcher.tsx     # Role badge & switcher control
│   │   └── ...
│   ├── context/                 # Application Context Providers
│   │   ├── AuthContext.tsx      # User authentication & RBAC state
│   │   ├── RoleContext.tsx      # Multi-role dashboard management
│   │   └── ThemeContext.tsx     # Theme switcher engine
│   ├── pages/                   # Application Pages & Dashboards
│   │   ├── LoginPage.tsx        # 2-step role selection & login
│   │   ├── AdminPage.tsx        # Admin Command & Control Center
│   │   ├── SupplierPage.tsx     # Supplier Partner Portal
│   │   ├── ScmGuidancePage.tsx  # World Bank SCM Risk Suite
│   │   ├── RoutesPage.tsx       # Evacuation route optimization
│   │   ├── SapPage.tsx          # SAP TM integration view
│   │   ├── OperationsPage.tsx   # Fleet & container operations
│   │   ├── AgentsPage.tsx       # Multi-Agent status monitor
│   │   ├── DocumentsPage.tsx    # Document & manifest management
│   │   └── AuditPage.tsx        # Immutable audit log ledger
│   ├── services/                # API and PDF utility services
│   │   ├── api.ts               # Frontend API client
│   │   └── pdfGenerator.ts      # Automated PDF report generator
│   └── types/                   # TypeScript interfaces & data models
└── SAP/                         # Python Backend Engine
    ├── app.py                   # Main Python API server
    ├── backend_api.py           # REST endpoints implementation
    ├── agents.py                # Autonomous AI evacuation agents
    ├── ai_rerouting.py          # AI route recalculation algorithms
    ├── sap_tm_client.py         # SAP TM OData integration client
    ├── database.py              # SQLite database manager
    ├── models.py                # Pydantic / dataclass data models
    ├── auth.py                  # Password hashing & JWT tokens
    ├── pdf_generator.py         # Backend PDF generation utility
    ├── requirements.txt         # Python package dependencies
    └── .env.example             # Environment variable template
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0 or higher
- **npm**: v9.0 or higher
- **Python**: v3.10 or higher (for local backend service)

---

### 1️⃣ Frontend Setup & Execution

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will run at `http://localhost:5173`.

3. **Build for production**:
   ```bash
   npm run build
   ```

---

### 2️⃣ Backend Setup & Execution (Python Service)

1. **Project Preparation**:
   - Navigate into the backend directory:
     ```bash
     cd SAP
     ```
   - Set up an isolated Python virtual environment:
     ```bash
     python -m venv venv
     ```
   - Activate the environment:
     - **Windows**: `.\venv\Scripts\activate`
     - **macOS / Linux**: `source venv/bin/activate`

2. **Environment Configuration (`requirements.txt`)**:
   - `requirements.txt` contains:
     ```text
     Flask==3.0.2
     Flask-Cors==4.0.0
     PyJWT==2.8.0
     pydantic==2.6.1
     requests==2.31.0
     reportlab==4.1.0
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```

3. **Database Layer Setup (`database.py`)**:
   - SQLite connection manager for local persistence (`smartevac_local.db`).
   - Table initialization for storing container audit logs (`audit_logs`).

4. **Authentication & Authorization (`auth.py`)**:
   - JSON Web Token (`jwt`) generation (`generate_token`) and decoding (`decode_token`) for role-based access control.

5. **Autonomous AI Agent Module (`agents.py`)**:
   - `EvacuationAgent` class evaluating environmental risk vectors and congestion levels.

6. **SAP TM OData Client Integration (`sap_tm_client.py`)**:
   - `SAPTMClient` class managing connection handles to SAP Transportation Management endpoints and mock payloads.

7. **API Application Server (`app.py`)**:
   - Main Flask server script combining routes, CORS policies, auth, agents, and SAP TM endpoints.

8. **Execution and Verification**:
   - Launch the backend application locally:
     ```bash
     python app.py
     ```
   - Confirm service is active at `http://localhost:5000`.

---

### 3️⃣ AWS Cloud Deployment Options

#### Option A: AWS App Runner (Serverless Container - 1-Click Deployment)
1. Push your repository to GitHub or upload container image to AWS ECR.
2. In AWS Console ➡️ **AWS App Runner** ➡️ Create Service.
3. Select Source Code Repository / Container Image.
4. Set Build Command: `docker build -t smartevac-app .` and Port: `5000`.
5. Click **Create & Deploy**. AWS provides a live, auto-scaling HTTPS URL automatically!

#### Option B: AWS ECS Fargate & ECR Deployment
1. Set AWS Credentials:
   ```cmd
   set AWS_ACCOUNT_ID=123456789012
   set AWS_REGION=us-east-1
   ```
2. Execute the automated AWS deployment script:
   - **Windows**: `deploy-aws.bat`
   - **macOS / Linux**: `./deploy-aws.sh`
3. Launch the ECS Fargate Service:
   ```bash
   aws ecs create-service --cluster default --service-name smartevac-service --task-definition smartevac-ai-task --desired-count 1 --launch-type FARGATE --network-configuration "awsvpcConfiguration={subnets=[subnet-xxxxxx],securityGroups=[sg-xxxxxx],assignPublicIp=ENABLED}"
   ```

---

## 🔒 Role-Based Access Demo Credentials

The platform features role isolation out-of-the-box. You can sign in using demo credentials or create new accounts:

| Role | Access Level | Description |
| :--- | :--- | :--- |
| 🛡️ **Admin** | Full System Control | Access to Admin Command Center, Agent Monitor, Audit Ledger, SAP TM Integration & World Bank SCM Guidance. |
| 🚛 **Supplier Partner** | Supplier Workspace | Access to Fleet Dispatch, Route Planning, Supplier Weather Map, and Manifest Exports. |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  Developed with ❤️ by <strong>SmartEvac AI Team</strong>
</p>
