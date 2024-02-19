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

        public async Task<IEnumerable<Joke>> GetAllJokesRandomized()
        {
            using (var db = new MySqlConnection(_config.GetConnectionString("MySQL")))
            {
                var sql = "SELECT * FROM joke";
                var jokes = await db.QueryAsync<Joke>(sql);
                var randomizedJokes = jokes.OrderBy(x => Random.Shared.Next()).ToList();
                return randomizedJokes;
            }
        }
    }
}