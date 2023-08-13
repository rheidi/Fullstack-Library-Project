using LibraryApi.Domain.src.Entities;
using LibraryApi.Domain.src.Abstractions;
using LibraryApi.Infrastructure.src.Database;

namespace LibraryApi.Infrastructure.src.RepoImplementations;

public class LoanRepo : BaseRepo<Loan>, ILoanRepo
{
  public LoanRepo(DatabaseContext dbContext) : base(dbContext)
  {
  }
}
