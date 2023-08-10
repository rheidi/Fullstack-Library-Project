using LibraryApi.Domain.src.Entities;

namespace LibraryApi.Service.src.Dtos;

public class BookReadDto
{
  public string Title { get; set; }
  public int Year { get; set; }
  public Author Author { get; set; }
  public string Description { get; set; }
  public Genre Genre { get; set; }
  public string ImageUrl { get; set; }
  public int BooksAvailable { get; set; }
}

public class BookCreateDto
{
  public string Title { get; set; }
  public int Year { get; set; }
  public Author Author { get; set; }
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