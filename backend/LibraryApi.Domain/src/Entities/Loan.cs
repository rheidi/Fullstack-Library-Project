namespace LibraryApi.Domain.src.Entities;

public class Loan : BaseEntity
{
  public User User { get; set; } = default!;
  public Book Book { get; set; } = default!;
  public DateOnly DueDate { get; set; }
  public bool IsReturned { get; set; } = false;
}
