using System.Reflection;

namespace LibraryApi.Domain.src.Entities;

public class Book : BaseEntity
{
  public string Title { get; set; } = string.Empty;
  public int Year { get; set; }
  public Author Author { get; set; } =default!;
  public string Description { get; set; } = string.Empty;
  public Genre Genre { get; set; }
  public string ImageUrl { get; set; } = string.Empty;
  public int LibraryInventory { get; set;}
  public int BooksAvailable { get; set; }
}
