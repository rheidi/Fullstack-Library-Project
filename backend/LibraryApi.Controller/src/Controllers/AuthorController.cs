using LibraryApi.Domain.src.Entities;
using LibraryApi.Service.src.Abstractions;
using LibraryApi.Service.src.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApi.Controller.src.Controllers;

//[Authorize]
public class AuthorController : CrudController<Author, AuthorReadDto, AuthorCreateDto, AuthorUpdateDto>
{
  private readonly IAuthorService _authorService;
  public AuthorController(IAuthorService baseService) : base(baseService)
  {
    _authorService = baseService;
  }

  [Authorize(Roles = "Admin")]
  [HttpPost]
  public override async Task<ActionResult<AuthorReadDto>> CreateOne([FromBody] AuthorCreateDto dto)
  {
    var createdAuthor = await _authorService.CreateOne(dto);
    return CreatedAtAction(nameof(CreateOne), createdAuthor);
  }

  [Authorize(Roles = "Admin")]
  [HttpPatch("{id:Guid}")]
  public override async Task<ActionResult<AuthorReadDto>> UpdateOneById([FromRoute] Guid id, [FromBody] AuthorUpdateDto updateDto)
  {
    var updatedAuthor = await _authorService.UpdateOneById(id, updateDto);
    return Ok(updatedAuthor);
  }

  [Authorize(Roles = "Admin")]
  [HttpDelete("{id:Guid}")]
  public override async Task<ActionResult<bool>> DeleteOneById([FromRoute] Guid id)
  {
    return StatusCode(204, await _authorService.DeleteOneById(id));
  }
}
