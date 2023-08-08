using LibraryApi.Domain.src.Entities;

namespace LibraryApi.Service.src.Dtos;

public class BookDto
{
  public string Title { get; set; }
  public int Year { get; set; }
  public Author Author { get; set; }
  public string Description { get; set; }
  public Genre Genre { get; set; }
  public string ImageUrl { get; set; }
}
