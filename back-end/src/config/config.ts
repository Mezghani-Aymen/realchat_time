export default () => ({
    jwt:
    {
        secret: process.env.JWT_SECRET,
    },
    database:
    {
        connectionString: process.env.MONGODB_URI,
    }
})