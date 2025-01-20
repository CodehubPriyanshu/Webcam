const asyncHandler = require('express-async-handler');
const cloudinary = require('cloudinary').v2;

// Import Schema
const Capture = require('../schemas/captureSchema');

// Initialize Controllers

// @desc    Create a new Captured Image
// @route   POST /api/captures/
// @access  Private

const createCapture = asyncHandler(async (req, res) => {
  const user = req.user._id;

  if (!req.file) {
    res.status(400);
    throw new Error('Please Upload an image');
  }

  // Upload the image buffer directly to Cloudinary using upload_stream
  const cloudinaryResponse = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream((error, result) => {
        if (error) {
          res
            .status(400)
            .json({ error: 'Failed to upload image to Cloudinary' });
          reject(error);
          return;
        }

        // Successfully uploaded to Cloudinary
        const imageURL = result.secure_url;
        resolve(imageURL);
      })
      .end(req.file.buffer);
  });

  const capture = new Capture({
    user,
    imageUrl: cloudinaryResponse,
  });

  const createdCapture = await capture.save();

  if (createdCapture) {
    res.status(201).json({
      message: 'Captured Image Successfully!',
      _id: createdCapture._id,
      user: createdCapture.user,
      imageUrl: createdCapture.imageUrl,
      createdAt: createdCapture.createdAt,
      updatedAt: createdCapture.updatedAt,
    });
  } else {
    res.status(400);
    throw new Error('Invalid Captured Image Data!');
  }
});

// @desc    Get Captured Image by ID
// @route   GET /api/captures/:id
// @access  Private

const getCaptureById = asyncHandler(async (req, res) => {
  const capture = await Capture.findById(req.params.id);

  if (capture) {
    res.json(capture);
  } else {
    res.status(404);
    throw new Error('Captured Image Not Found!');
  }
});

// @desc    Update Captured Image by ID
// @route   PUT /api/captures/:id
// @access  Private

const updateCaptureById = asyncHandler(async (req, res) => {
  const capture = await Capture.findById(req.params.id);

  if (capture) {
    const updatedCapture = await capture.save();

    res.json({
      capture: updatedCapture,
      message: 'Captured Image Updated Successfully!',
    });
  } else {
    res.status(404);
    throw new Error('Captured Image Not Found!');
  }
});

// @desc    Delete Captured Image by ID
// @route   DELETE /api/captures/:id
// @access  Private

const deleteCaptureById = asyncHandler(async (req, res) => {
  const deletedCapture = await Capture.findByIdAndDelete(req.params.id);

  if (deletedCapture) {
    res.status(201);
    res.json({ message: 'Captured Image Deleted!' });
  } else {
    res.status(404);
    throw new Error('Captured Image Not Found!');
  }
});

// @desc   Get all Captured Images by User ID
// @route   GET /api/captures/user/:id
// @access  Private

const getCapturesByUserId = asyncHandler(async (req, res) => {
  const captures = await Capture.find({ user: req.params.id });

  if (captures) {
    res.json(captures);
  } else {
    res.status(404);
    throw new Error('Captured Image Not Found!');
  }
});

// @desc    Delete All Captured Images by User ID
// @route   DELETE /api/captures/user/:id
// @access  Private

const deleteCapturesByUserId = asyncHandler(async (req, res) => {
  const deletedCaptures = await Capture.deleteMany({ user: req.params.id });

  if (deletedCaptures) {
    res.status(201);
    res.json({ message: 'All Captured Images Deleted!' });
  } else {
    res.status(404);
    throw new Error('Captured Image Not Found!');
  }
});

// @desc    Get all Captured Images
// @route   GET /api/captures/
// @access  Private/Admin

const getAllCaptures = asyncHandler(async (req, res) => {
  const captures = await Capture.find({});

  if (captures) {
    res.json(captures);
  } else {
    res.status(404);
    throw new Error('Captured Image Not Found!');
  }
});

// @desc    Delete all Captured Images
// @route   DELETE /api/captures/
// @access  Private/Admin

const deleteAllCaptures = asyncHandler(async (req, res) => {
  const deletedCaptures = await Capture.deleteMany({});

  if (deletedCaptures) {
    res.status(201);
    res.json({ message: 'All Captured Images Deleted!' });
  } else {
    res.status(404);
    throw new Error('Captured Image Not Found!');
  }
});

module.exports = {
  createCapture,
  getCaptureById,
  updateCaptureById,
  deleteCaptureById,
  getCapturesByUserId,
  deleteCapturesByUserId,
  getAllCaptures,
  deleteAllCaptures,
};
