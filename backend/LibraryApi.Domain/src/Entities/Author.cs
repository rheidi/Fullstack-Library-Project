namespace LibraryApi.Domain.src.Entities;

public class Author : BaseEntity
{
  public string FirstName { get; set; } = string.Empty;
  public string LastName { get; set; } = string.Empty;
}
