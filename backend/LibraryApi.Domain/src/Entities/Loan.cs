using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryApi.Domain.src.Entities;

public class Loan : BaseEntity
{
  public bool IsReturned { get; set; }
  public Guid UserId { get; set; }
  public Guid BookId { get; set; }
  public User User { get; set; }
  public Book Book { get; set; }
  // public DateOnly DueDate { get; set; }  
}
