using LibraryApi.Domain.src.Entities;
using LibraryApi.Service.src.Abstractions;
using LibraryApi.Service.src.Dtos;

namespace LibraryApi.Controller.src.Controllers;

public class LoanController : CrudController<Loan, LoanReadDto, LoanCreateDto, LoanUpdateDto>
{
  private readonly ILoanService _loanService;
  public LoanController(ILoanService baseService) : base(baseService)
  {
    _loanService = baseService;
  }
}
