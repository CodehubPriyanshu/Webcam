const express = require('express');

// Initialize Express Router
const router = express.Router();

// Import Middlewares
const { protect, admin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/imageUploadMiddleware');

// Import Controllers
const {
  createCapture,
  getCaptureById,
  updateCaptureById,
  deleteCaptureById,
  getCapturesByUserId,
  deleteCapturesByUserId,
  getAllCaptures,
  deleteAllCaptures,
} = require('../controllers/captureControllers');

// Initialize Routes

// Public Routes

// Private Routes

router.route('/').post(protect, upload.single('image'), createCapture);

router
  .route('/:id')
  .get(protect, getCaptureById)
  .put(protect, updateCaptureById)
  .delete(protect, deleteCaptureById);

router
  .route('/user/:id')
  .get(protect, getCapturesByUserId)
  .delete(protect, deleteCapturesByUserId);

// Admin + Private Routes

router
  .route('/')
  .get(protect, admin, getAllCaptures)
  .delete(protect, admin, deleteAllCaptures);

// Export Router
module.exports = router;
