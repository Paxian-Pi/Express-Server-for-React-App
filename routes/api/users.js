const express = require('express');
// const res = require('express/lib/response');
const router = express.Router();

// @route   GET api/users/test
// @desc    Tests users route
// @access  public
router.get('/test', (req, res) => res.json({ msg: "Users Works" }));

module.exports = router;