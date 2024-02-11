using dadjokes.Models;
using Dapper;
using MySqlConnector;

namespace dadjokes.Data
{
    public class JokeService : IJokeService
    {
        private IConfiguration _config { get; }        

        public JokeService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<IEnumerable<Joke>> GetAllJokes()
        {
            string? connectionString = _config.GetConnectionString("MySQL");

            using (var connection = new MySqlConnection(connectionString))
            {
                var sql = "SELECT * FROM joke";
                var jokes = await connection.QueryAsync<Joke>(sql);
                return jokes;
            }
        }
    }
}
