namespace LibraryApi.Service.src.Dtos;

public class AuthorReadDto
{
  public Guid Id { get; set;}
  public string FirstName { get; set; }
  public string LastName { get; set; }
  public int YearOfBirth { get; set; }
}

public class AuthorUpdateDto
{
  public string FirstName { get; set; }
  public string LastName { get; set; }
  public int YearOfBirth { get; set; }
}

public class AuthorCreateDto
{
  public string FirstName { get; set; }
  public string LastName { get; set; }
  public int YearOfBirth { get; set; }
}
