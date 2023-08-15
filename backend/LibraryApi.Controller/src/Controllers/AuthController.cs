using LibraryApi.Service.src.Abstractions;
using LibraryApi.Service.src.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApi.Controller.src.Controllers;


[ApiController]
[Route("api/v1/[controller]")]
public class AuthController : ControllerBase
{
  private readonly IAuthService _authService;

  public AuthController(IAuthService authService)
  {
    _authService = authService;
  }

  [HttpPost]
  public async Task<ActionResult<string>> VerifyCredentials([FromBody] UserCredentialsDto credentials)
  {
    return Ok(await _authService.VerifyCredentials(credentials));
  }
}
