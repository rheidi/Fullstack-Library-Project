using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryApi.Domain.src.Entities;

public class Loan : BaseEntity
{
  public bool IsReturned { get; set; }
  public Guid UserId { get; set; }
  public Guid BookId { get; set; }
  public User User { get; set; } = null!;
  public Book Book { get; set; } = null!;
  // public DateOnly DueDate { get; set; }  
}
