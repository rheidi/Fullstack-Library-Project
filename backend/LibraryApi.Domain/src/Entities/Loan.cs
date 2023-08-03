namespace LibraryApi.Domain.src.Entities;

public class Loan : BaseEntity
{
  public User User { get; set; }
  public Book Book { get; set; }
  public DateOnly DueDate { get; set; }
  public bool IsReturned { get; set; } = false;
}
