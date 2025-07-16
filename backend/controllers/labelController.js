const Label = require('../models/Label');

// Create a new label
exports.createLabel = async (req, res) => {
  try {
    const { name } = req.body;

    // Debug log
    console.log("Creating label:", name);

    const newLabel = await Label.create({ name });

    res.status(201).json(newLabel);
  } catch (error) {
    console.error("❌ Error creating label:", error); // <-- log the real error
    res.status(500).json({ message: 'Failed to create label' });
  }
};


// Get all labels
exports.getLabels = async (req, res) => {
  try {
    const labels = await Label.find();
    res.json(labels);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch labels' });
  }
};
