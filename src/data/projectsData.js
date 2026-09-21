// ==============================================================================
// WebBloomBuilds — Portfolio Projects Data
// ==============================================================================
//
// ==============================================================================
// HOW TO ADD A NEW PROJECT
// ==============================================================================
//
// 1. Put the project screenshot inside the project assets folder:
//    src/assets/projects/
//
// 2. Add the screenshot path inside screenshots: [].
//    Example:
//      '/assets/projects/your-project-home.png'
//
// 3. Paste the live website URL inside liveUrl.
//
// 4. Change the project name, tier, description, and features.
//
// 5. Save the file.
//
// 6. Push/deploy the website!
//
// ------------------------------------------------------------------------------
// COPY THIS TEMPLATE TO ADD A NEW PROJECT:
// ------------------------------------------------------------------------------
// {
//   id: 4,
//   name: 'YOUR PROJECT NAME',
//   tier: 'STANDARD WEBSITE', // BASIC WEBSITE | STANDARD WEBSITE | PREMIUM WEBSITE | E-COMMERCE WEBSITE | EVENT WEBSITE | WEBSITE REDESIGN | CUSTOM PROJECT
//   description: 'YOUR SHORT DESCRIPTION',
//   liveUrl: 'https://yourwebsite.com',
//
//   screenshots: [
//     '/assets/projects/your-project-home.png',
//     '/assets/projects/your-project-mobile.png',
//   ],
//
//   features: [
//     'Feature 1',
//     'Feature 2',
//   ],
//
//   visible: true, // set to false to temporarily hide from public website
// },
// ==============================================================================

export const projects = [
  // ==================================================
  // ADD YOUR PROJECTS HERE
  // ==================================================

  {
    id: 1,

    // ===== PROJECT INFORMATION =====
    name: 'Padmini Nursery',
    tier: 'STANDARD WEBSITE',
    description: 'A clean website designed to showcase a nursery and its offerings.',

    // ===== LIVE WEBSITE =====
    liveUrl: 'https://padmininursery.netlify.app/',

    // ===== PROJECT SCREENSHOTS =====
    screenshots: [
      // Add screenshot paths here
      // Example:
      // '/assets/projects/padmini-home.png',
      // '/assets/projects/padmini-mobile.png',
      '/assets/projects/padmini-nursery.png',
    ],

    // ===== PROJECT FEATURES =====
    features: [
      'Modern Multi-Page Website',
      'Product Catalog & Showcase',
      'Search & Category Filtering',
      'Product Details & Availability',
      'Shopping Cart System',
      'WhatsApp Ordering',
      'Customer Enquiry / Order Form',
      'Fully Responsive Design',
    ],

    // ===== VISIBILITY =====
    visible: true,
  },

  {
    id: 2,

    // ===== PROJECT INFORMATION =====
    name: 'Bolster Math Tutoring',
    tier: 'BASIC WEBSITE',
    description: 'A simple tutoring website presenting programs and essential learning information.',

    // ===== LIVE WEBSITE =====
    liveUrl: 'https://mathtutorksr.github.io/Bolster-Math-Tutoring/',

    // ===== PROJECT SCREENSHOTS =====
    screenshots: [
      '/assets/projects/bolster-math.png',
    ],

    // ===== PROJECT FEATURES =====
    features: [
      'Professional Website Design',
      'Course & Service Information',
      'Online, Offline & International Sections',
      'Contact & WhatsApp Integration',
      'Fully Responsive Design',
    ],

    // ===== VISIBILITY =====
    visible: true,
  },

  {
    id: 3,

    // ===== PROJECT INFORMATION =====
    name: 'DreamBasket',
    tier: 'PREMIUM WEBSITE',
    description: 'A premium e-commerce website with a dedicated private admin dashboard.',

    // ===== LIVE WEBSITE =====
    liveUrl: 'https://dreambasket16.netlify.app/',

    // ===== PROJECT SCREENSHOTS =====
    screenshots: [
      '/assets/projects/dreambasket.png',
      '/assets/projects/dreambasket-admin.png',
    ],

    // ===== PROJECT FEATURES =====
    customerFeatures: [
      'Premium Product Catalog',
      'Product Search & Categories',
      'Customer Account System',
      'Shopping Cart & Checkout',
      'Online Payment Integration',
      'Order History & Notifications',
    ],

    adminFeatures: [
      'Admin Dashboard',
      'Product Management',
      'Category Management',
      'Inventory & Stock Management',
      'Order Management',
      'Sales & Profit Analytics',
    ],

    features: [
      'Premium Product Catalog',
      'Product Search & Categories',
      'Customer Account System',
      'Shopping Cart & Checkout',
      'Online Payment Integration',
      'Order History & Notifications',
      'Admin Dashboard',
      'Product Management',
      'Category Management',
      'Inventory & Stock Management',
      'Order Management',
      'Sales & Profit Analytics',
    ],

    // ===== VISIBILITY =====
    visible: true,
  },
];
