
module.exports = {
  
    /**Declaration of databases for my development environment**/
      
          databases: [
              {
                  database:"cabinet",
                  username: "root",  //only for testing purposes you can also define the values here
                  password:  "",
                  host: "localhost",
                 
                  dialect: "mysql"  //here you need to define the dialect of your databse, in my case it is Postgres
              },
              {
                database:"cabinet2",
                username: "root",  //only for testing purposes you can also define the values here
                password:  "",
                host: "localhost",
               
                dialect: "mysql"
              },
          
        ]
    }