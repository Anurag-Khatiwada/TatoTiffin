# Tato-Tiffin

Tato-Tiffin is an online food delivery web application that allows users to browse menu items, add them to their cart, and place orders using Stripe for secure payment processing. This project was developed to gain hands-on experience in building a full-stack application using the MERN stack.

## Features

### User Authentication
- **User Registration & Login**: Users can create an account by providing their name, email, and password.
- **Authentication & Authorization**: Registered users can log in to access their accounts and manage orders securely.

### Food Ordering System
- **Menu Browsing**: Users can browse available food items, view descriptions, pricing, and images.
- **Add to Cart**: Users can add multiple food items to their cart before placing an order.
- **Order Placement**: Users can place an order after reviewing their cart and proceeding with payment.

### Order Management
- **Order Tracking**: Users can check the status of their orders.
- **Admin Controls**: Admins can manage food items, update order statuses, and oversee platform operations.

### Payments
- **Secure Payment Processing**: Tato-Tiffin integrates with Stripe to handle secure transactions, ensuring a seamless checkout experience.

## Technology Stack

### Frontend
- **React**: JavaScript library for building the user interface.
- **CSS**: Provides styling for the application.

### Backend
- **Node.js**: JavaScript runtime environment used for server-side scripting.
- **Express**: Web application framework for Node.js to handle routing and middleware management.

### Database
- **MongoDB**: NoSQL database for storing user data, menu items, and order details.

### Payment Integration
- **Stripe**: Payment gateway used for secure online transactions.

## Learning Outcomes
This project provided an opportunity to:

- Develop a full-stack application using the MERN stack.
- Implement user authentication and authorization.
- Work with Stripe for secure payment processing.
- Manage orders efficiently with an admin dashboard.
- Implement CRUD operations in a food delivery platform context.

## Future Enhancements
Potential improvements for the project include:

- Adding real-time order tracking for better user experience.
- Implementing search and filtering options for food items.
- Enhancing UI/UX with a more interactive design.
- Integrating email notifications for order confirmations and status updates.

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/tato-tiffin.git
   cd tato-tiffin

### 2. Install dependencies for frontend, admin, and backend:

cd frontend

npm install

cd ../admin

npm install

cd ../backend

npm install


### 3. Create a .env file in the backend directory and add the necessary configurations:

MONGO_URI=your_mongo_connection_string

STRIPE_SECRET_KEY=your_stripe_secret_key

# Start frontend

cd frontend

npm run dev

# Start admin panel

cd ../admin

npm run dev



# Start backend

cd ../backend

npm start

### Screenshots
![Screenshot 2025-03-27 193127](https://github.com/user-attachments/assets/e6ebf119-d839-4201-8650-82671b478fb6)
![Screenshot 2025-03-27 193050](https://github.com/user-attachments/assets/94642344-0775-4031-9047-ae1adb1ff2e6)
![Screenshot 2025-03-27 193427](https://github.com/user-attachments/assets/2d837989-2b9d-4363-a4a3-2b9fdc2f55d3)
![Screenshot 2025-03-27 193359](https://github.com/user-attachments/assets/3682c268-aed5-42de-a33f-95dac11f0235)
![Screenshot 2025-03-27 193337](https://github.com/user-attachments/assets/a6449ead-9c3e-4f8e-8d76-21294919c9cc)
![Screenshot 2025-03-27 193304](https://github.com/user-attachments/assets/e286af77-2309-4df9-a8db-0888b7b08f24)
![Screenshot 2025-03-27 193243](https://github.com/user-attachments/assets/7da78f04-52c2-4a9d-b0ae-2e42811d9d4b)
![Screenshot 2025-03-27 193214](https://github.com/user-attachments/assets/2f94f4f9-dc6f-4521-b23b-889d1178a88c)
