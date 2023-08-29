using LibraryApi.Domain.src.Entities;
using LibraryApi.Domain.src.Abstractions;
using LibraryApi.Infrastructure.src.Database;
using Microsoft.EntityFrameworkCore;

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
    return await _loans.Where(l => l.Id == id).ToListAsync();
  }
}
