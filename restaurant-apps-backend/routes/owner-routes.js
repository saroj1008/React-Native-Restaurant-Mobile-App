const express = require('express');
const router = express.Router();

const ownerController = require('../controllers/owner-controllers');
const verifyToken = require('../middlewares/verifyToken');

//owner
router.get('/:owner_code', verifyToken,ownerController.getOwnersById ); //getOwnersById
router.get('/', verifyToken,ownerController.getAllOwners ); //getOwnersById
router.post('/', ownerController.createOwner); //Create new Owner
router.patch('/:owner_code', verifyToken, ownerController.updateOwner); // update owner

//Notes
router.get('/:owner_code/notes', verifyToken, ownerController.getAllNotes); //get All notes
router.put('/:owner_code/notes', verifyToken, ownerController.addNote); // add new note
router.patch('/:owner_code/notes/:note_code', verifyToken, ownerController.updateNote); // edit note
router.delete('/:owner_code/notes/:note_code', verifyToken, ownerController.deleteNote); // delete note


module.exports = router;
