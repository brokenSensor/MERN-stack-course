import mongoose from 'mongoose';

export default async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGOURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});

		console.log('MongoDB Connected!');
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}
