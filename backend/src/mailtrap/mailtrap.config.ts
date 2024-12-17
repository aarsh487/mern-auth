import { MailtrapClient } from 'mailtrap';
import { MAILTRAP_TOKEN } from '../utils/config';

export const mailtrapClient = new MailtrapClient({
    token: MAILTRAP_TOKEN
});

export const sender = {
    email: "mailtrap@demomailtrap.com",
    name: "Aarsh"
};