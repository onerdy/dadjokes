using dadjokes.Models;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace dadjokes.Data
{
    public interface IJokeService
    {
        public Task<IEnumerable<Joke>> GetAllJokesRandomized();
    }
}
