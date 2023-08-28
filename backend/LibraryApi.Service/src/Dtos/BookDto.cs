using LibraryApi.Domain.src.Entities;

namespace LibraryApi.Service.src.Dtos;

public class BookReadDto
{
  public Guid Id { get; set; }
  public string Title { get; set; }
  public int Year { get; set; }
  public AuthorReadDto Author { get; set; }
  public string AuthorName { get; set; }
  public string Description { get; set; }
  public Genre Genre { get; set; }
  public string ImageUrl { get; set; }
  public int BooksAvailable { get; set; }
}

public class BookCreateDto
{
  public string Title { get; set; }
  public int Year { get; set; }
  public Guid AuthorId { get; set; }
  public string AuthorName { get; set; }
  public string Description { get; set; }
  public Genre Genre { get; set; }
  public string ImageUrl { get; set; }
  public int LibraryInventory { get; set;}
  public int BooksAvailable { get; set; }
}

public class BookUpdateDto
{
  public string Description { get; set; }
  public Genre Genre { get; set; }
  public string ImageUrl { get; set; }
  public int LibraryInventory { get; set;}
}
