import mongoose from 'mongoose';

export default async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGOURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log('MongoDB Connected!');
	} catch (error) {
		console.error(error.message);
		process.exit(1);
	}
}
