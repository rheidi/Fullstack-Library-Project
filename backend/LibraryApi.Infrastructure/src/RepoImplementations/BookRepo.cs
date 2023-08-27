using LibraryApi.Domain.src.Entities;
using LibraryApi.Domain.src.Abstractions;
using LibraryApi.Infrastructure.src.Database;
using Microsoft.EntityFrameworkCore;
using LibraryApi.Domain.src.Shared;

namespace LibraryApi.Infrastructure.src.RepoImplementations;

public class BookRepo : BaseRepo<Book>, IBookRepo
{
  private readonly DbSet<Book> _books;
  private readonly DatabaseContext _context;
  public BookRepo(DatabaseContext dbContext) : base(dbContext)
  {
    _books = dbContext.Books;
    _context = dbContext;
  }
  
/*   public override async Task<IEnumerable<Book>> GetAll(QueryOptions queryOptions)
  {
    return await _books.Include(b => b.Author).ToArrayAsync();
  } */
  
}
