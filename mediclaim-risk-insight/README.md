# MediClaim AI - Hospital Billing Intelligence

## Overview
MediClaim AI is an advanced, interactive web dashboard designed to solve a critical business problem in the healthcare industry: **insurance claim rejections**. Built for Hospital Billing Managers, this tool provides actionable insights into historical claim data and uses Artificial Intelligence to predict and prevent future rejections before they happen.

This project was developed as an **Industry Focus Capstone Project**.

## Features
* **📊 Analytics Dashboard**: Visualizes 90-day claim trends, overall rejection rates, top rejection reasons, and provider-specific rejection rates using interactive charts.
* **🗂️ Claims Directory**: A searchable and filterable data grid to manage and track all submitted claims.
* **🤖 AI Claim Predictor**: A comprehensive claim submission simulator. Users can input patient, provider, and coding details, attach supporting documents, and receive a real-time **Rejection Risk Score**. It utilizes the Google Gemini AI to provide natural language analysis and actionable suggestions to ensure claim approval.

## Tech Stack
* **Frontend Framework**: React 19 with Vite
* **Styling**: Tailwind CSS
* **Data Visualization**: Recharts
* **Icons**: Lucide React
* **Artificial Intelligence**: Google Gemini API (`@google/genai`)

## Getting Started

### Prerequisites
* Node.js (v18 or higher)
* npm (Node Package Manager)

### Installation

1. Clone the repository or extract the downloaded ZIP file.
2. Navigate to the project directory:
   ```bash
   cd your-repo-name
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up your environment variables:
   * Rename `.env.example` to `.env`
   * Open `.env` and add your Google Gemini API key:
     ```env
     GEMINI_API_KEY="your_actual_api_key_here"
     ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open your browser and navigate to the local URL provided in your terminal (usually `http://localhost:3000` or `http://localhost:5173`).

## Project Structure
* `/src/components/`: Contains the main views (`Analytics.tsx`, `ClaimsTable.tsx`, `ClaimPredictor.tsx`) and reusable UI components (`ui.tsx`).
* `/src/data/`: Contains the synthetic data generator (`mockData.ts`) used to simulate the hospital's billing database.
* `/src/lib/`: Utility functions (e.g., Tailwind class merging).
* `/src/App.tsx`: The main application layout, sidebar navigation, and state management.

## Capstone Deliverables Addressed
* **Live Application**: Built as a modern React SPA.
* **Data Readiness**: Utilizes a custom synthetic data generator to simulate realistic medical claims, handling various statuses, providers, and rejection reasons.
* **Logic to Application**: Wraps heuristic risk-scoring logic and LLM-based analysis into an interactive, user-friendly interface.
