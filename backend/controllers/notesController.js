import asyncHandler from "express-async-handler";
import Note from "../models/noteModel.js";

// @desc    Fetch all notes
// @route   GET /api/notes
// @access  Public
export const getNotes = asyncHandler(async (req, res) => {
  try {
    const pageSize = 7;
    const currentPage = Number(req.query.currentPage) || 1;
    const queries = {};
    if (req.query.symbols)
      queries.$or = [
        {
          title: {
            $regex: req.query.symbols,
            $options: "i",
          },
        },
        {
          text: {
            $regex: req.query.symbols,
            $options: "i",
          },
        },
      ];
    if (req.query.userId !== undefined) {
      queries.user = req.query.userId;
    } else {
      queries.$and = [{ user: { $ne: req.user._id } }];
    }

    const count = await Note.countDocuments(queries);

    const notes = await Note.find(queries)
      .limit(pageSize)
      .skip(pageSize * (currentPage - 1))
      .populate("user")
      .sort({ createdAt: "desc" });
    res.json({ notes, currentPage, pageCount: Math.ceil(count / pageSize) });
  } catch (e) {
    console.log(e);
  }

  // const products = await Product.find({ ...keyword })
  //   .limit(pageSize)
  //   .skip(pageSize * (page - 1));
  // res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch all notes by userId
// @route   GET /api/products
// @access  Public

// @desc    Fetch single product
// @route   GET /api/notes/:id
// @access  Public
export const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id).populate("user");

  if (note) {
    res.json(note);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

// @desc    Delete a notes
// @route   DELETE /api/notes/:id
// // @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    await note.remove();
    res.json({ message: "Note removed" });
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

// @desc    Create a note
// @route   POST /api/notes
// @access  Private/Admin
export const createNote = asyncHandler(async (req, res) => {
  const { title, text } = req.body;
  const note = new Note({
    title,
    text,
    user: req.user._id,
  });

  const createdNote = await note.save();
  createdNote.user = req.user;
  res.status(201).json(createdNote);
});

// @desc    Update a notes
// @route   PUT /api/notes/:id
export const updateProduct = asyncHandler(async (req, res) => {
  const { title, text } = req.body;

  const note = await Note.findById(req.params.id);

  if (note) {
    note.title = title;
    note.text = text;
    const updatedNote = await note.save();
    updatedNote.user = req.user;

    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

export const copyNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    const copiedNote = new Note({
      title: note.title,
      text: note.text,
      originalNote: note.id,
      user: req.user._id,
    });
    const cretedNote = await copiedNote.save();
    cretedNote.user = req.user;
    res.status(201).json(createdNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});
