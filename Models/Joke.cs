using System.ComponentModel.DataAnnotations;

namespace dadjokes.Models
{
    public class Joke
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Required field")]
        public required string Question { get; set; }

        [Required(ErrorMessage = "Required field")]
        public required string Answer { get; set; }
    }
}
