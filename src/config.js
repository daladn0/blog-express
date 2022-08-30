import dotenv from "dotenv";
dotenv.config();

export default {
	MONGO_URI: process.env.MONGO_URI,
	PORT: parseInt(process.env.PORT),
	JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
	SALT: process.env.SALT,
	API_URL: process.env.API_URL,
	CLIENT_URL: process.env.CLIENT_URL,
	SMTP_HOST: process.env.SMTP_HOST,
	SMTP_PORT: process.env.SMTP_PORT,
	SMTP_USER: process.env.SMTP_USER,
	SMTP_PASSWORD: process.env.SMTP_PASSWORD,
};
