import nodemailer from "nodemailer";
import config from "../config.js";

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: config.SMTP_HOST,
			port: config.SMTP_PORT,
			secure: false,
			auth: {
				user: config.SMTP_USER,
				pass: config.SMTP_PASSWORD,
			},
		});
	}

	/**
	 *
	 * @param {string} to user email
	 * @param {string} activationHash user action link hash
	 */
	async sendActivationMail(to, activationHash) {
		await this.transporter.sendMail({
			from: config.SMTP_USER,
			to,
			subject: "Account activation on " + config.API_URL,
			text: "",
			html: `
				<div>
					<h1>Follow this link to activate your account:</h1>
					<a href="${config.API_URL}/api/v1/user/activate/${activationHash}" target="_blank">Activate account</a>
				</div>
			`,
		});
	}
}

export default new MailService();
