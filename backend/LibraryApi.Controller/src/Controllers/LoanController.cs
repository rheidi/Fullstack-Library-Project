using System.Security.Claims;
using LibraryApi.Domain.src.Entities;
using LibraryApi.Service.src.Abstractions;
using LibraryApi.Service.src.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApi.Controller.src.Controllers;

public class LoanController : CrudController<Loan, LoanReadDto, LoanCreateDto, LoanUpdateDto>
{
  private readonly ILoanService _loanService;
  public LoanController(ILoanService baseService) : base(baseService)
  {
    _loanService = baseService;
  }

  [Authorize]
  [HttpGet("userloans")]
  public async Task<ActionResult<IEnumerable<LoanReadDto>>> GetLoansForOneUser(Guid id)
  {
    var result = (await _loanService.GetLoansForOneUser(id)).ToArray();
    return Ok(result);
  }
}
