const Note = require('../models/Note');

// ------------------ GET All Notes ------------------
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).populate('label');
    console.log("✅ Fetched notes for user:", req.user._id);
    res.json(notes);
  } catch (error) {
    console.error("❌ Error in getNotes:", error.message);
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
};

// ------------------ CREATE a New Note ------------------
exports.createNote = async (req, res) => {
  try {
    const { title, content, label } = req.body;
    console.log("Creating note for user:", req.user._id);

    // Validation: ensure label is a valid ObjectId
    if (!label.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid label ID format' });
    }

    const newNote = await Note.create({
      user: req.user._id,
      title,
      content,
      label,
    });

    console.log("✅ Note created for user:", req.user._id);
    res.status(201).json(newNote);
  } catch (error) {
    console.error("❌ Error in createNote:", error.message);
    res.status(500).json({ message: 'Failed to create note' });
  }
};

// ------------------ UPDATE a Note ------------------
exports.updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found or unauthorized' });
    }

    console.log("✅ Note updated:", updatedNote._id);
    res.json(updatedNote);
  } catch (error) {
    console.error("❌ Error in updateNote:", error.message);
    res.status(500).json({ message: 'Failed to update note' });
  }
};

// ------------------ DELETE a Note ------------------
exports.deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found or unauthorized' });
    }

    console.log("✅ Note deleted:", deletedNote._id);
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error("❌ Error in deleteNote:", error.message);
    res.status(500).json({ message: 'Failed to delete note' });
  }
};
