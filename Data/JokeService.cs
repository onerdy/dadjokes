using dadjokes.Models;
using Dapper;
using MySqlConnector;

namespace dadjokes.Data
{
    public class JokeService : IJokeService
    {
        private readonly DbConnection _dbConnection;

        public JokeService(DbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<IEnumerable<Joke>> GetAllJokesRandomized()
        {
            using (var db = _dbConnection.CreateConnection())
            {
                var sql = "SELECT * FROM joke ORDER BY RAND()";
                var randomizedJokes = await db.QueryAsync<Joke>(sql);
                return randomizedJokes;
            }
        }
    }
}