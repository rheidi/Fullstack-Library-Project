namespace LibraryApi.Domain.src.Entities;

public class Author : BaseEntity
{
  public string FirstName { get; set; }
  public string LastName { get; set; }
  public List<Book> Books { get; } = new List<Book>();
  public int YearOfBirth { get; set; }
}
