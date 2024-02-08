const OwnerSchema = require("../models/ownerSchema");
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

// Query the owner collection to retrieve the owner details and associated notes. 

//1. Creating owner 
const createOwner = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        const newObj = { ...req.body, password: hashedPassword }
        const owner = new OwnerSchema(newObj);
        await owner.save();
        return res.status(201).json({ success: true, message: "Owner created successfully", data: owner });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

//2. Update owner Information in owner collection
const updateOwner = async (req, res) => {
    try {
        const { owner_code } = req.params;
        const { firstName, lastName, phone, address } = req.body;
        const owner = await OwnerSchema.findById(owner_code);
        if (!owner) {
            return res.status(404).json({ success: false, message: "Owner not found" })
        }

        owner.firstName = firstName;
        owner.lastName = lastName;
        owner.phone = phone;
        owner.address = address;

        await owner.save();

        res.json({ success: true, message: "Owner updated successfully", data: owner });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


// 3. Adding notes on this owner
const addNote = async (req, res) => {
    try {
        const { owner_code } = req.params;
        const { date, title, comment } = req.body;

        const owner = await OwnerSchema.findById(owner_code);
        if (!owner) {
            return res.status(404).json({ success: false, message: "Owner not found" });
        }

        const newNote = { date, title, comment };

        owner.notes.push(newNote);
        await owner.save();

        res.status(201).json({ success: true, message: "Note added successfully", data: newNote });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


// 4. Edit a note for owner
const updateNote = async (req, res) => {
    try {
        const { owner_code, note_id } = req.params;
        const { title, comment } = req.body;

        const owner = await OwnerSchema.findById(owner_code);
        if (!owner) {
            return res.status(404).json({ success: false, message: "Owner not found" });
        }

        const note = owner.notes.id(note_id);
        if (!note) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }

        note.title = title;
        note.comment = comment;

        await owner.save();

        res.json({ success: true, message: "Note updated successfully", data: note });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


// 5. List all notes for owner
const getAllNotes = async (req, res) => {
    try {
        const { owner_code } = req.params;

        const owner = await OwnerSchema.findById(owner_code);
        if (!owner) {
            return res.status(404).json({ success: false, message: "Owner not found" });
        }

        const notes = owner.notes;
        res.json({ success: true, message: "Notes retrieved successfully", data: notes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

//6. Delete note by id:
const deleteNote = async (req, res) => {
    try {
        const { owner_code, note_code } = req.params;

        const owner = await OwnerSchema.findById(owner_code);
        if (!owner) {
            return res.status(404).json({ success: false, message: "Owner not found" });
        }

        const noteIndex = owner.notes.findIndex((note) => note._id.toString() === note_code);
        if (noteIndex === -1) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }

        owner.notes.splice(noteIndex, 1); // Remove the note from the array

        await owner.save();

        return res.json({ success: true, message: "Note deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



// 7. getOwnersById
const getOwnersById = async (req, res) => {
    try {
        const { owner_code } = req.params;
        const owner = await OwnerSchema.findById(owner_code);

        if (!owner) {
            return res.status(404).json({ success: false, message: "Owner not found" });
        }

        res.json({ success: true, message: "Notes retrieved successfully", data: owner });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

//8. getAllOwners
const getAllOwners = async (req, res) => {
    try {
        const { owner_code } = req.params;
        const owner = await OwnerSchema.find({});

        if (!owner) {
            return res.status(404).json({ success: false, message: "Owner not found" });
        }

        res.json({ success: true, message: "Notes retrieved successfully", data: owner });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = {
    getAllOwners,
    getOwnersById,
    createOwner,
    updateOwner,
    addNote,
    updateNote,
    getAllNotes,
    deleteNote,
}
