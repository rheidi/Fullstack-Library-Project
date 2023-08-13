using LibraryApi.Domain.src.Entities;
using LibraryApi.Domain.src.Abstractions;
using LibraryApi.Infrastructure.src.Database;

namespace LibraryApi.Infrastructure.src.RepoImplementations;

public class BookRepo : BaseRepo<Book>, IBookRepo
{
  public BookRepo(DatabaseContext dbContext) : base(dbContext)
  {
  }
}
