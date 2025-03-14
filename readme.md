# 🚚 Smart Delivery Management System

A modern delivery management dashboard designed to streamline partner management, order processing, and smart order assignments. Manage your delivery partners, track orders, and optimize assignments with ease!

<!-- ![Build Status](https://img.shields.io/github/actions/workflow/status/shk-khalid/smart-delivery-system/ci.yml)  --> 
![License: MIT](https://img.shields.io/github/license/shk-khalid/smart-delivery-system)  
![Made with Django](https://img.shields.io/badge/Made%20with-Django-green)

---

## ✨ Features

- 👥 **Partner Management** – Register, edit, and manage delivery partners, including scheduling shifts and assigning service areas.
- 📦 **Order Processing** – Track and manage customer orders with real-time status updates and assignment history.
- ⚡ **Smart Order Assignment** – Automatically assign orders to available partners based on current load, location, and shift timings.
- 📊 **Performance Metrics** – Monitor key performance indicators like assignment success rates and order processing times.

---

## 🌐 Live Demo

Experience the live application: [Smart Delivery Management System](https://smart-delivery-system.vercel.app/)

---

## 🛠️ Tech Stack

- **Frontend**: React with Vite & TypeScript  
  - Dependencies include: Axios, React Router, Tailwind CSS, React Query, Recharts, React Leaflet, and more (see [`smartDelivery_Client/package.json`](smartDelivery_Client/package.json) for full details)
- **Backend**: Python Django & Django REST Framework  
  - Libraries used: Django ORM, PostgreSQL, Django REST Framework, and various utilities for data aggregation and API handling.
- **Database**: PostgreSQL
- **Deployment**: Vercel (Frontend) & Render (Backend)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- Python (3.8+)
- PostgreSQL
- A virtual environment tool (e.g., `venv` or `virtualenv`)

---

### Installation

#### Frontend

1. **Clone the repository and navigate to the frontend folder:**
   ```bash
   git clone https://github.com/shk-khalid/smart-delivery-system.git
   cd smart-delivery-system/smartDelivery_client
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. **Build for production:**
   ```bash
   npm run build
   ```

#### Backend

1. **Navigate to the backend directory:**
   ```bash
   cd ../smartDelivery
   ```
2. **Create a virtual environment and activate it:**
   ```bash
   python -m venv myenv
   source myenv/bin/activate  # For Unix/Linux/Mac
   # For Windows:
   # myenv\Scripts\activate
   ```
3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
4. **Configure your PostgreSQL database:**
   - Ensure PostgreSQL is installed and running.
   - Create a new database and update your Django settings with the correct credentials.
5. **Apply database migrations:**
   ```bash
   python manage.py migrate
   ```
6. **Start the Django server:**
   ```bash
   python manage.py runserver
   ```

---

## 🔧 Environment Variables

To run this project, create a `.env` file in the backend directory and add the following environment variables:

```env
DATABASE_URL=your_postgresql_connection_string
SECRET_KEY=your_django_secret_key
DEBUG=True
```

For the frontend, create a `.env` file inside `smartDelivery_client` with:

```env
VITE_API_BASE_URL=http://localhost:8000
```

---

## 🔄 API Documentation

The backend API is documented using Swagger (or a similar tool). To view the API docs:

- Visit: `http://localhost:8000/api/docs` (adjust if necessary)
- Alternatively, refer to the [`docs/api.md`](docs/api.md) file for detailed API information.

---

## 🧪 Running Tests

To run tests in the backend:

```bash
python manage.py test
```

To run frontend tests:

```bash
npm test
# or
yarn test
```

---

## 🚀 Deployment

### Frontend Deployment

- Deploy your React app on platforms like **Vercel** or **Netlify**.
- Ensure you run `npm run build` and deploy the output from the `/dist` directory.

### Backend Deployment

- Deploy your Django backend on **Heroku, DigitalOcean, or AWS**.
- Ensure that all environment variables (e.g., database credentials, secret keys) are properly configured in production.
- Consider containerizing your backend with **Docker** for consistent deployments.

---

<!-- ## 🔄 Continuous Integration & Deployment (CI/CD)

This project uses **GitHub Actions** for automated testing and deployment. CI/CD runs automatically on **every push** to ensure:
- Code quality
- Successful builds
- Automated tests are passed 
--- -->

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add an amazing feature"
   ```
4. Push your branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a **Pull Request** for review.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

For questions or further information, please contact:

📧 Khalid Shaikh - [shk.khalid18@gmail.com](mailto:shk.khalid18@gmail.com)  

📂 Project Repository: [Smart Delivery Management System](https://github.com/shk-khalid/smart-delivery-system.git)
