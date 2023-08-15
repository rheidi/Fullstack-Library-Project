using LibraryApi.Domain.src.Entities;

namespace LibraryApi.Service.src.Dtos;

public class UserReadDto
{
  public string Email { get; set; }
  public string FirstName { get; set; }
  public string LastName { get; set; }
  public Role Role { get; set; } = Role.Customer;
}

public class UserCreateDto
{
  public string Email { get; set; }
  public string FirstName { get; set; }
  public string LastName { get; set; }
  public string Password { get; set; }
}

public class UserUpdateDto
{
  public string FirstName { get; set; }
  public string LastName { get; set; }
}

public class UserCredentialsDto
{
  public string Email { get; set; }
  public string Password { get; set; }
}
