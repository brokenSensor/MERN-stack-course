import jwt from 'jsonwebtoken';

export default function (req, res, next) {
	// Get token drom header
	const token = req.header('x-auth-token');

	if (!token) {
		return res.status(401).json({ msg: 'No Token, Authorization denied' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWTSECRET);

		req.user = decoded.user;
		next();
	} catch (error) {
		res.status(401).json({ msg: 'Token is not valid' });
	}
}
