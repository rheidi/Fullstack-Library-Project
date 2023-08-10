using LibraryApi.Domain.src.Entities;
using LibraryApi.Service.src.Abstractions;
using LibraryApi.Service.src.Dtos;

namespace LibraryApi.Controller.src.Controllers;

public class AuthorController : CrudController<Author, AuthorReadDto, AuthorCreateDto, AuthorUpdateDto>
{
  public AuthorController(IAuthorService baseService) : base(baseService)
  {
  }
}
