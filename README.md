# FinacPlus QA Automation Case Study

##  Candidate: Harshith Kalyan Pesala

### 🔧 Tools Used
- Playwright (JavaScript)
- Node.js
- ReqRes API

###  Project Structure
- `ui.spec.js`: UI automation for DemoQA Book Store
- `api.spec.js`: API automation for ReqRes
- `playwright.config.js`: Playwright configuration
- `book_details.txt`: Book details extracted from UI test
- `user_id.txt`: User ID from API test
###  How to Run
1. Install dependencies:
   ```bash
   npm install
npx playwright test ui.spec.js
npx playwright test api.spec.js
npx playwright show-report

Output Files
book_details.txt: Contains book title, author, publisher
user_id.txt: Stores created user ID from API test
