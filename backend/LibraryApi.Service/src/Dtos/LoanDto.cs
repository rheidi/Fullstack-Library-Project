namespace LibraryApi.Service.src.Dtos;

public class LoanReadDto
{
  public Guid Id { get; set; }
  public Guid UserId { get; set; }
  public Guid BookId { get; set; }
  // public DateOnly DueDate { get; set; }
  public bool IsReturned { get; set; }
}

public class LoanUpdateDto
{
  //  public DateOnly DueDate { get; set; }
  public bool IsReturned { get; set; }
}

public class LoanCreateDto
{
  public Guid UserId { get; set; }
  public Guid BookId { get; set; }
}
