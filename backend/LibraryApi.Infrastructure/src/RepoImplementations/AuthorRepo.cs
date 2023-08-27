using LibraryApi.Domain.src.Entities;
using LibraryApi.Domain.src.Abstractions;
using LibraryApi.Infrastructure.src.Database;
using Microsoft.EntityFrameworkCore;
using LibraryApi.Domain.src.Shared;

namespace LibraryApi.Infrastructure.src.RepoImplementations;

public class AuthorRepo : BaseRepo<Author>, IAuthorRepo
{
  private readonly DbSet<Author> _authors;
  private readonly DatabaseContext _context;

  public AuthorRepo(DatabaseContext dbContext) : base(dbContext)
  {
    _authors = dbContext.Authors;
    _context = dbContext;
  }

  public async Task<Author?> FindAuthorByName(string firstName, string lastName)
  {
    return await _authors.FirstOrDefaultAsync(a => a.FirstName == firstName && a.LastName == lastName);
  }

/*   public override async Task<IEnumerable<Author>> GetAll(QueryOptions queryOptions)
  {
    return await _authors.Include(b => b.Books).ToArrayAsync();
  } */
}
