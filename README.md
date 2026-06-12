# AI-Based Code Review System Using Large Language Models with Hybrid Validation and IDE Integration

## Overview

The AI-Based Code Review System is an intelligent software platform that automates code analysis using Large Language Models (LLMs), rule-based validation, and runtime execution analysis. The system helps developers and students identify bugs, code smells, security vulnerabilities, runtime errors, and performance issues while providing detailed explanations and improvement suggestions.

This project combines AI-powered code understanding with traditional static analysis techniques to deliver comprehensive and accurate code reviews.

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

## System Architecture

1. User writes code in Monaco Editor.
2. Code is submitted for analysis.
3. AI Review Engine performs LLM-based analysis.
4. Rule Engine performs static validation.
5. Sandbox executes code securely.
6. Results are merged and displayed.
7. User receives feedback, suggestions, and runtime outputs.

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

* Python Execution Sandbox

---

## Project Structure

```text
AI_CODE/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   ├── models/
│   ├── utils/
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/AI-Code-Review-System.git
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

## Usage

1. Select a programming language.
2. Write or paste source code.
3. Click "Initiate Code Review".
4. View:

   * AI Feedback
   * Rule Engine Results
   * Runtime Execution Output
   * Complexity Analysis
5. Improve code based on suggestions.

---

## Sample Test Case

```python
arr = [10,20,30,40,50]

for i in range(len(arr)+1):
    print(arr[i])
```

Expected Detection:

* Runtime Error
* Array Out of Bounds
* IndexError
* Improvement Suggestions

---

## Advantages

* Reduces manual code review effort
* Improves software quality
* Helps students learn coding practices
* Detects both logical and runtime errors
* Provides AI-generated explanations
* Supports multiple programming languages

---

## Future Enhancements

* VS Code Extension Integration
* Real-Time Collaboration
* CI/CD Pipeline Integration
* Security Vulnerability Scanning
* Additional Language Support
* Advanced Performance Profiling

---

## Conclusion

The AI-Based Code Review System combines Google Gemini LLM, rule-based validation, and runtime execution analysis to provide intelligent and comprehensive code reviews. The hybrid approach improves bug detection accuracy, enhances software quality, and serves as an effective learning tool for developers and students.

---
