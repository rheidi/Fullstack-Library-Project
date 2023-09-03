using LibraryApi.Domain.src.Entities;
using LibraryApi.Domain.src.Abstractions;
using LibraryApi.Infrastructure.src.Database;
using Microsoft.EntityFrameworkCore;
using LibraryApi.Domain.src.Shared;
using LibraryApi.Service.src.Implementations;

namespace LibraryApi.Infrastructure.src.RepoImplementations;

public class LoanRepo : BaseRepo<Loan>, ILoanRepo
{
  private readonly DbSet<Loan> _loans;
  private readonly DatabaseContext _context;
  public LoanRepo(DatabaseContext dbContext) : base(dbContext)
  {
    _loans = dbContext.Loans;
    _context = dbContext;
  }

  public async Task<IEnumerable<Loan>> GetLoansForOneUser(Guid id)
  {
    var loans = _loans.Include(l => l.User)
                       .Include(l => l.Book)
                       .ThenInclude(l => l.Author).AsQueryable();

    loans = loans.Where(l => l.UserId == id);
    return await loans.ToListAsync();
  }

  public async override Task<Loan> GetOneById(Guid id)
  {
    return await _loans.Include(l => l.User).Include(l => l.Book).FirstOrDefaultAsync(a => a.Id == id);
  }

  public async override Task<IEnumerable<Loan>> GetAll(QueryOptions queryOptions)
  {
    var loans = _loans.Include(l => l.User).Include(l => l.Book).AsQueryable();

    loans.OrderBy(l => l.User.LastName).ThenBy(l => l.User.LastName);

    if (queryOptions.OrderByDescending)
    {
      loans.OrderDescending();
    }

    loans = loans.Skip((queryOptions.PageNumber - 1) * queryOptions.PageSize)
      .Take(queryOptions.PageSize);

    return await loans.ToListAsync();
  }
}
