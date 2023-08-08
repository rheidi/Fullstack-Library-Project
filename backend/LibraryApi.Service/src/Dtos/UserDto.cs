using LibraryApi.Domain.src.Entities;

namespace LibraryApi.Service.src.Dtos;

public class UserDto
{
  public string Email { get; set; }
  public string UserName { get; set; }
  public string FirstName { get; set; }
  public string LastName { get; set; }
  public Role Role { get; set; } = Role.Customer;
}
