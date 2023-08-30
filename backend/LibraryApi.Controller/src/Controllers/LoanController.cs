using System.Security.Claims;
using LibraryApi.Domain.src.Entities;
using LibraryApi.Domain.src.Shared;
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

  [Authorize(Roles = "Admin")]
  public override async Task<ActionResult<IEnumerable<LoanReadDto>>> GetAll([FromQuery] QueryOptions queryOptions)
  {
    return Ok(await _loanService.GetAll(queryOptions));
  }

  [Authorize]
  [HttpPost]
  public override async Task<ActionResult<LoanReadDto>> CreateOne([FromBody] LoanCreateDto dto)
  {
    var createdLoan = await _loanService.CreateOne(dto);
    return CreatedAtAction(nameof(CreateOne), createdLoan);
  }

  [Authorize(Roles = "Admin")]
  [HttpPatch("{id:Guid}")]
  public override async Task<ActionResult<LoanReadDto>> UpdateOneById([FromRoute] Guid id, [FromBody] LoanUpdateDto updateDto)
  {
    var updatedLoan = await _loanService.UpdateOneById(id, updateDto);
    return Ok(updatedLoan);
  }

  [Authorize(Roles = "Admin")]
  [HttpDelete("{id:Guid}")]
  public override async Task<ActionResult<bool>> DeleteOneById([FromRoute] Guid id)
  {
    return StatusCode(204, await _loanService.DeleteOneById(id));
  }  
}
