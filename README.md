# AI-Based Code Review System

## Overview

AI-Based Code Review System is an intelligent platform that combines Google Gemini LLM, Rule-Based Validation, and Runtime Execution Analysis to automatically review source code, detect bugs, identify code smells, analyze complexity, and provide improvement suggestions.

The system helps developers and students improve code quality while reducing the effort required for manual code reviews.

---

## Features

### AI-Powered Code Review

* Uses Google Gemini Large Language Model (LLM)
* Detects logical bugs and code smells
* Provides code quality analysis
* Suggests improvements and optimizations
* Generates developer-friendly explanations

### Rule-Based Validation Engine

* Detects unused variables
* Identifies hardcoded secrets
* Checks coding standards
* Detects duplicate code patterns
* Performs static code analysis

### Runtime Execution Analysis

* Executes code in a secure sandbox
* Detects runtime exceptions
* Identifies array out-of-bounds errors
* Detects division-by-zero issues
* Displays execution output and error traces

### Complexity Analysis

* Estimates Time Complexity
* Estimates Space Complexity
* Helps optimize program performance

### Multi-Language Support

* Python
* Java
* C++
* JavaScript

### User Modes

* Developer Mode
* Student Mode

### Additional Modules

* Review History
* Knowledge Base
* Analytics Dashboard

---

## Technology Stack

### Frontend

* React.js
* TypeScript
* Tailwind CSS
* Monaco Editor

### Backend

* Node.js
* Express.js

### Database

* MySQL

### Authentication

* JWT Authentication

### AI Integration

* Google Gemini API

### Runtime Environment

* Python Sandbox Execution

---

## Screenshots

### Homepage / Workspace

![Homepage](./screenshots/homepage.png)

*Main workspace where users can write code, select a programming language, and initiate code reviews.*

---

### AI Feedback Module

![AI Feedback](./screenshots/ai-feedback.png)

*Displays AI-generated code review feedback, optimization suggestions, code quality analysis, and complexity estimation.*

---

### Rule-Based Validation Engine

![Rule Engine](./screenshots/rule-engine.png)

*Performs static analysis using predefined coding standards and validation rules.*

---

### Runtime Execution Console

![Runtime Console](./screenshots/runtime-console.png)

*Executes source code in a secure sandbox environment and detects runtime exceptions and execution errors.*

---

## System Workflow

1. User writes code in Monaco Editor.
2. Code is submitted for review.
3. Google Gemini performs AI analysis.
4. Rule Engine validates coding standards.
5. Sandbox executes code securely.
6. Results are merged and displayed.
7. User receives suggestions, bug reports, and runtime outputs.

---

## Project Structure

```text
AI_CODE/
│
├── screenshots/
│   ├── homepage.png
│   ├── ai-feedback.png
│   ├── rule-engine.png
│   └── runtime-console.png
│
├── frontend/
├── backend/
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/AI-Code-Review-System.git
cd AI-Code-Review-System
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

---

## Future Enhancements

* VS Code Extension Integration
* CI/CD Integration
* Security Vulnerability Scanner
* Additional Programming Language Support
* Real-Time Collaborative Reviews

---

## Conclusion

The AI-Based Code Review System combines Large Language Models, Rule-Based Validation, and Runtime Execution Analysis to provide accurate and intelligent code reviews. The platform improves software quality, helps developers learn best practices, and automates the traditional code review process.

---


