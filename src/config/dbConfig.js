module.exports={
  default:'mysql',
  mysql:{
    client:'mysql',
    connection: {
    host : process.env.DB_HOST||'localhost',
    user : process.env.DB_USER||'root',
    password : process.env.DB_PASSWORD||'',
    database : process.env.DB_DATABASE||'example_db'
  },
  pool: {
    min: 1,
    max: 20,
  }
  }
};