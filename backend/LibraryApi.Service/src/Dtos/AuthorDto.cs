using LibraryApi.Domain.src.Entities;

namespace LibraryApi.Service.src.Dtos;

public class AuthorReadDto
{
  public string FirstName { get; set; }
  public string LastName { get; set; }
  public List<Book> Books { get; set; }
}

public class AuthorUpdateDto
{
  public List<Book> Books { get; set; }
}

public class AuthorCreateDto
{
  public string FirstName { get; set; }
  public string LastName { get; set; }
  public List<Book> Books { get; set; }
}