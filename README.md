# 🪔 PujaSojja - Premium Spiritual eCommerce Platform

**PujaSojja** is a high-end, production-ready eCommerce website dedicated to selling premium Puja and religious items. Designed with a **Dark Royal Theme**, it combines traditional aesthetics with modern shopping features to provide a seamless spiritual experience.

---

## 🎨 Theme Overview: Dark Royal
- **Primary Color:** Dark Maroon (`#3B0A0A`) - Representing tradition and depth.
- **Secondary Color:** Gold (`#FFD700`) - Representing purity and luxury.
- **Background:** Soft Beige (`#F5E6CC`) - For a clean and premium feel.
- **Typography:** Elegant Serif (Playfair Display) for headings & Modern Sans-serif (Inter) for body.

---

## 🚀 Tech Stack
- **Frontend:** React 19 (TypeScript) + Vite
- **Styling:** Tailwind CSS (Custom Theme Configuration)
- **Backend/Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **Image Hosting:** Cloudinary (Only)
- **State Management:** Zustand (Cart & Wishlist)
- **Icons:** Lucide React
- **SEO:** React Helmet Async
- **Notifications:** React Hot Toast

---

## ✨ Key Features

### 🛍️ Customer Side
- **Authentication:** Login, Register, Forgot Password, and Profile Management.
- **Product Discovery:** Advanced filtering by category and price, and dynamic search.
- **Product Details:** High-quality image gallery, rich text descriptions, and related products.
- **Shopping Experience:** Real-time Cart and Wishlist using Zustand persist.
- **Checkout:** Secure multi-step checkout with Cash on Delivery & Online Payment options.
- **Responsive Design:** Mobile-first approach with smooth animations.
- **Contact:** WhatsApp floating button and Google Maps integration.

### 🛡️ Admin Panel (Protected)
- **Dashboard:** Real-time analytics and inventory alerts.
- **Product Management:** Full CRUD (Create, Read, Update, Delete) with Cloudinary image uploads and Rich Text Editor.
- **Order Management:** Track customer orders and update delivery status.
- **Category Management:** Create and manage product categories with images.
- **Customer Directory:** View registered users and their details.
- **Security:** Role-based access control (Admin only).

---

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [your-repo-link]
   cd pujasojja
2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
3. **Configure Environment Variables:**
   Create a .env file in the root and add your keys:
   ```bash
   VITE_FIREBASE_API_KEY="your_api_key"
   VITE_FIREBASE_AUTH_DOMAIN="your_auth_domain"
   VITE_FIREBASE_PROJECT_ID="your_project_id"
   VITE_FIREBASE_STORAGE_BUCKET="your_storage_bucket"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
   VITE_FIREBASE_APP_ID="your_app_id"

   VITE_CLOUDINARY_CLOUD_NAME="your_cloud_name"
   VITE_CLOUDINARY_UPLOAD_PRESET="your_upload_preset"
2. **Run the development server:**
   ```bash
   npm run dev

## 🔒 Security & Optimization
- **Firebase Security Rules:** Implemented to prevent unauthorized data access.
- **Admin Guard:** Route protection for sensitive admin pages.
- **Performance:** Code splitting, lazy loading of images, and optimized Firestore queries.
- **SEO:** Dynamic Meta Titles and Descriptions for every product and page.

## 📄 License
This project is developed for PujaSojja. All rights reserved.