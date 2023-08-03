namespace LibraryApi.Domain.src.Shared;

public class QueryOptions
{
  public string Search { get; set; } = string.Empty;
  public string Order { get; set;} = "UpdatedAt";
  public bool OrderByDescending { get; set;} = false;
  public int PageNumber { get; set;} = 1;
  public int PageSize { get; set;} = 10;
}
