using LibraryApi.Domain.src.Entities;

namespace LibraryApi.Domain.src.Abstractions;

public interface ILoanRepo : IBaseRepo<Loan>
{
  Task<IEnumerable<Loan>> GetLoansForOneUser(Guid id);
}
