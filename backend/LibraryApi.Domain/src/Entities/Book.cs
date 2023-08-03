using System.Reflection;

namespace LibraryApi.Domain.src.Entities;

public class Book : BaseEntity
{
  public string Title { get; set; }
  public int Year { get; set; }
  public Author Author { get; set; }
  public string Description { get; set; }
  public Genre Genre { get; set; }
  public string ImageUrl { get; set; }
}
