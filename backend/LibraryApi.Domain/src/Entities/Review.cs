namespace LibraryApi.Domain.src.Entities;

public class Review : BaseEntity
{
  public User User { get; set; } = default!;
  public string ReviewText { get; set; } = string.Empty;
  public int Rating { get; set; }
}
