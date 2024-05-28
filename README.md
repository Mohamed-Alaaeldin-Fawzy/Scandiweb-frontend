# Scandiweb Frontend test

This is the frontend for an e-commerce website. It allows users to browse products, add them to the cart, and complete the checkout process.

## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

## Features

- Browse products by category
- View product details
- Add products to the cart
- Checkout process
- Responsive design

## Folder Structure

```
frontend/
├── public/
│   ├── index.html
│   └── images/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Card.tsx
│   │   ├── CardsSection.tsx
│   │   ├── Cart.tsx
│   │   ├── CartItem.tsx
│   │   ├── Header.tsx
│   │   └── Layout.tsx
│   │   ├── Overlay.tsx
│   │   ├── ProductAttributes.tsx
│   │   ├── ProductDescription.tsx
│   │   ├── ProductDetails.tsx
│   │   ├── ProductImage.tsx
│   │   └── ProductViewer.tsx
│   │   ├── Sidebar.tsx
│   ├── context/
│   │   ├── CartContext.tsx
│   │   ├── SelectedCategoryContext.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── ProductDetails.tsx
│   ├── graphql/
│   │   ├── client.ts
│   │   ├── mutation.ts
│   │   ├── query.ts
│   ├── utils/
│   │   └── htmlParser.js
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── vite-env.d.ts
├── .gitignore
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.ts
```

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Mohamed-Alaaeldin-Fawzy/Scandiweb-frontend.git
   cd Scandiweb-frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## Usage

1. Start the development server:

   ```sh
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173` (or the port specified in your configuration).

## Technologies Used

- **React**: JavaScript library for building user interfaces
- **ContextApi**: State management
- **ApolloClient**: HTTP client for making requests to the Graphql API
- **React Router**: Routing library for React
- **Tailwind**: Styling
- **Typescript**: for making a safer javascript and react experience
