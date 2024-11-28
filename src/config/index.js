module.exports = {
    PORT: process.env.PORT || 5001,
    JWT_KEY: process.env.JWT_SECRET,
    SERVER_URL: process.env.SERVER_URL,
    PSQL_HOST: process.env.PSQL_HOST,
    PSQL_DB: process.env.PSQL_DB,
    PSQL_USER: process.env.PSQL_USER,
    PSQL_PWD: process.env.PSQL_PWD,
    PSQL_PORT: process.env.PSQL_PORT,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
};
