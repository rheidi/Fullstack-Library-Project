namespace LibraryApi.Domain.src.Entities;

public class User : BaseEntity
{
  public string Email { get; set; }
  public string UserName { get; set; }
  public byte[] Password { get; set; }
  public string FirstName { get; set; }
  public string LastName { get; set; }
  public Role Role { get; set; } = Role.Customer;
}
