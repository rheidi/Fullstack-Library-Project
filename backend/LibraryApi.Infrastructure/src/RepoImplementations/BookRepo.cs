using LibraryApi.Domain.src.Entities;
using LibraryApi.Domain.src.Abstractions;
using LibraryApi.Infrastructure.src.Database;
using Microsoft.EntityFrameworkCore;
using LibraryApi.Domain.src.Shared;
using System.Linq;

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

  public async override Task<Book> GetOneById(Guid id)
  {
    return await _books.Include(b => b.Author).FirstOrDefaultAsync(a => a.Id == id);
  }

  public async override Task<IEnumerable<Book>> GetAll(QueryOptions queryOptions)
  {
    var books = _books.Include(b => b.Author).AsQueryable();

    if(!string.IsNullOrEmpty(queryOptions.Search))
    {
      var searchTerm = queryOptions.Search.ToLower();
      books = books.Where(b => b.Title.ToLower().Contains(searchTerm) ||
            b.Author.FirstName.ToLower().Contains(searchTerm) ||
            b.Author.LastName.ToLower().Contains(searchTerm) ||
            b.Genre.ToString().ToLower().Contains(searchTerm)
      );
    }
  
    books.OrderBy(b => b.Title).ThenBy(b => b.Author.LastName).ThenBy(b => b.Author.FirstName);

    if (queryOptions.OrderByDescending)
    {
      books = books.OrderByDescending(b => b.Title)
                   .ThenByDescending(b => b.Author.LastName)
                   .ThenByDescending(b => b.Author.FirstName);
    }

    books = books.Skip((queryOptions.PageNumber - 1) * queryOptions.PageSize)
      .Take(queryOptions.PageSize);

    return await books.ToListAsync();
  }
}
