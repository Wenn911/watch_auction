
export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // ssl: {
    //   ca: fs.readFileSync(path.join(os.homedir(), '.cloud-certs', 'root.crt'), 'utf-8'),
    //   rejectUnauthorized: true,
    // },
  },
}
