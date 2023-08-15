namespace LibraryApi.Domain.src.Entities;

public class User : BaseEntity
{
  public string Email { get; set; } = string.Empty;
  public string Password { get; set; } = string.Empty;
  public byte[] Salt { get; set; } = default!;
  public string FirstName { get; set; } = string.Empty;
  public string LastName { get; set; } = string.Empty;
  public Role Role { get; set; } = Role.Customer;
}
