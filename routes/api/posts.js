import { Router } from 'express';
import auth from '../../middleware/auth.js';
import { check, validationResult } from 'express-validator';
import User from '../../models/User.js';
import Post from '../../models/Post.js';
import Profile from '../../models/Profile.js';
const router = Router();

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
	'/',
	[auth, [check('text', 'Text is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');

			const newPost = new Post({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			});

			const post = await newPost.save();

			res.json(post);
		} catch (error) {
			console.error(error);
			res.status(500).send('Server error');
		}
	}
);

export default router;
