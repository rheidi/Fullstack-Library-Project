using LibraryApi.Domain.src.Entities;

namespace LibraryApi.Service.src.Dtos;

public class LoanReadDto
{
  public Guid Id { get; set; }
  public UserReadDto User { get; set; }
  public BookReadDto Book { get; set; }
  public DateOnly DueDate { get; set; }
  public bool IsReturned { get; set; }
}

public class LoanUpdateDto
{
  public DateOnly DueDate { get; set; }
  public bool IsReturned { get; set; }
}

public class LoanCreateDto
{
  public User User { get; set; }
  public Book Book { get; set; }
  public DateOnly DueDate { get; set; }
  public bool IsReturned { get; set; }
}
