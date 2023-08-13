using LibraryApi.Domain.src.Entities;
using LibraryApi.Domain.src.Abstractions;
using LibraryApi.Infrastructure.src.Database;

namespace LibraryApi.Infrastructure.src.RepoImplementations;

public class AuthorRepo : BaseRepo<Author>, IAuthorRepo
{
  public AuthorRepo(DatabaseContext dbContext) : base(dbContext)
  {
  }
}
