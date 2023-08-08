using LibraryApi.Domain.src.Entities;

namespace LibraryApi.Service.src.Dtos;

public class LoanDto
{
  public User User { get; set; }
  public Book Book { get; set; }
  public DateOnly DueDate { get; set; }
  public bool IsReturned { get; set; } = false;
}
