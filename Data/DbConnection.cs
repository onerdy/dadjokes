using MySqlConnector;
using System.Data;

namespace dadjokes.Data
{

    public class DbConnection
    {
        private readonly IConfiguration _configuration;
        private readonly string? _connectionString;

        public DbConnection(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("MySQL");
        }
        public IDbConnection CreateConnection()
        {
            return new MySqlConnection(_connectionString);
        }
    }
}