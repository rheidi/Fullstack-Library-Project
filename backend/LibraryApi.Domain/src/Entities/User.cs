namespace LibraryApi.Domain.src.Entities;

public class User : BaseEntity
{
  public string Email { get; set; }
  public string Password { get; set; }
  public byte[] Salt { get; set; }
  public string FirstName { get; set; }
  public string LastName { get; set; }
  public Role Role { get; set; }
  public List<Loan> Loans { get; } = new List<Loan>();
}
