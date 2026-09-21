// ==============================================================================
// WebBloomBuilds — Client Reviews Data
// ==============================================================================
//
// ==============================================================================
// HOW TO ADD A NEW CLIENT REVIEW
// ==============================================================================
//
// 1. Put the review screenshot inside:
//    src/assets/reviews/
//
// 2. Add the screenshot path to image.
//    Example:
//      '/assets/reviews/client-review.png'
//
// 3. Add the client name if available (optional).
//
// 4. Add the business name if available (optional).
//
// 5. Set visible: true to show it.
//
// 6. Set visible: false if you want to temporarily hide it.
//
// 7. To permanently delete a review, remove that review object.
//
// ------------------------------------------------------------------------------
// COPY THIS TEMPLATE TO ADD A NEW CLIENT REVIEW:
// ------------------------------------------------------------------------------
// {
//   id: 4,
//
//   clientName: 'CLIENT NAME',
//   businessName: 'BUSINESS NAME',
//
//   image: '/assets/reviews/client-review.png',
//
//   visible: true,
// },
// ==============================================================================

export const reviews = [
  // ==================================================
  // ADD NEW CLIENT REVIEWS BELOW
  // ==================================================

  {
    id: 1,

    // ===== CLIENT INFORMATION =====
    clientName: '',
    businessName: 'Padmini Nursery',

    // ===== REVIEW SCREENSHOT =====
    // Put screenshot in src/assets/reviews/ and add path below (e.g. '/assets/reviews/padmini-review.png')
    image: 'src/assets/reviews/Padmini nursery review.jpeg',

    // ===== VISIBILITY =====
    visible: true,
  },


  {
    id: 2,

    // ===== CLIENT INFORMATION =====
    clientName: '',
    businessName: 'DreamBasket',

    // ===== REVIEW SCREENSHOT =====
    image: 'src/assets/reviews/Dreambasket Review.jpeg',

    // ===== VISIBILITY =====
    visible: true,
  },
];
