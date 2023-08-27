namespace LibraryApi.Domain.src.Entities;

public class Review : BaseEntity
{
  public User User { get; set; }
  public string ReviewText { get; set; }
  public int Rating { get; set; }
}
