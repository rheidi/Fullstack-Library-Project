namespace LibraryApi.Domain.src.Entities;

public class BaseEntity : TimeStamp
{
  public Guid Id { get; set; }
}
