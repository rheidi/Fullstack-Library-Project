using AutoMapper;
using LibraryApi.Domain.src.Abstractions;
using LibraryApi.Domain.src.Entities;
using LibraryApi.Service.src.Abstractions;
using LibraryApi.Service.src.Dtos;

namespace LibraryApi.Service.src.Implementations;

public class LoanService : BaseService<Loan, LoanReadDto, LoanCreateDto, LoanUpdateDto>, ILoanService
{
  private readonly ILoanRepo _loanRepo;
  public LoanService(ILoanRepo loanRepo, IMapper mapper) : base(loanRepo, mapper)
  {
    _loanRepo = loanRepo;
  }

  public async Task<IEnumerable<LoanReadDto>> GetLoansForOneUser(Guid id)
  {
    return _mapper.Map<IEnumerable<LoanReadDto>>(await _loanRepo.GetLoansForOneUser(id));
  }
}
