export default () => ({
    jwt:
    {
        secret: process.env.JWT_SECRET,
        expires: '1h'
    },
    database:
    {
        connectionString: process.env.MONGODB_URI,
    }
})