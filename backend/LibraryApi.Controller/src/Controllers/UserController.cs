using LibraryApi.Domain.src.Entities;
using LibraryApi.Service.src.Abstractions;
using LibraryApi.Service.src.Dtos;

namespace LibraryApi.Controller.src.Controllers;

public class UserController : CrudController<User, UserReadDto, UserCreateDto, UserUpdateDto>
{
  private readonly IUserService _userService;
  public UserController(IUserService baseService) : base(baseService)
  {
    _userService = baseService;
  }
}
