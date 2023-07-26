const dotenv = require('dotenv')
const { Command } = require('commander')

const program = new Command()

program.option("--mode <mode>", "modo de trabajo", 'DEVELOPMENT')
program.parse();

dotenv.config({
    path: program.opts().mode === 'DEVELOPMENT' ? './.env.development' : './.env.production',
})


module.exports = {
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    MODE: process.env.MODE,
    GITHUB_ID: process.env.GITHUB_ID,
    GOOGLE_ID: process.env.GOOGLE_ID,
    FACEBOOK_ID: process.env.FACEBOOK_ID,
}
