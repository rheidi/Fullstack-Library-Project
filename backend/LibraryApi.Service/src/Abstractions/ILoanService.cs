using LibraryApi.Domain.src.Entities;
using LibraryApi.Service.src.Dtos;

namespace LibraryApi.Service.src.Abstractions;

public interface ILoanService : IBaseService<Loan, LoanReadDto, LoanCreateDto, LoanUpdateDto>
{
  
}
