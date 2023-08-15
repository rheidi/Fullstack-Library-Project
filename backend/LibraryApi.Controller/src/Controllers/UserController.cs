using LibraryApi.Domain.src.Entities;
using LibraryApi.Domain.src.Shared;
using LibraryApi.Service.src.Abstractions;
using LibraryApi.Service.src.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApi.Controller.src.Controllers;

public class UserController : CrudController<User, UserReadDto, UserCreateDto, UserUpdateDto>
{
  private readonly IUserService _userService;
  public UserController(IUserService baseService) : base(baseService)
  {
    _userService = baseService;
  }

/*   [Authorize(Roles = "Admin")]
  public async Task<ActionResult<UserReadDto>> CreateAdmin([FromBody] UserCreateDto dto)
  {
    return CreatedAtAction(nameof(CreateAdmin), await _userService.CreateAdmin(dto));
  } */

  [Authorize(Roles = "Admin")]
  public override async Task<ActionResult<IEnumerable<UserReadDto>>> GetAll([FromQuery] QueryOptions queryOptions)
  {
    return Ok(await _userService.GetAll(queryOptions));
  }
}
