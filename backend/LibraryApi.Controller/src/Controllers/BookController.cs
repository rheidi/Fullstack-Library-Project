using LibraryApi.Domain.src.Entities;
using LibraryApi.Service.src.Abstractions;
using LibraryApi.Service.src.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApi.Controller.src.Controllers;

public class BookController : CrudController<Book, BookReadDto, BookCreateDto, BookUpdateDto>
{
  private readonly IBookService _bookService;
  public BookController(IBookService baseService) : base(baseService)
  {
    _bookService = baseService;
  }

  [Authorize(Roles = "Admin")]
  [HttpPost]
  public override async Task<ActionResult<BookReadDto>> CreateOne([FromBody] BookCreateDto dto)
  {
    var createdBook = await _bookService.CreateOne(dto);
    return CreatedAtAction(nameof(CreateOne), createdBook);
  }

  [Authorize(Roles = "Admin")]
  [HttpPatch("{id:Guid}")]
  public override async Task<ActionResult<BookReadDto>> UpdateOneById([FromRoute] Guid id, [FromBody] BookUpdateDto updateDto)
  {
    var updatedBook = await _bookService.UpdateOneById(id, updateDto);
    return Ok(updatedBook);
  }

  [Authorize(Roles = "Admin")]
  [HttpDelete("{id:Guid}")]
  public override async Task<ActionResult<bool>> DeleteOneById([FromRoute] Guid id)
  {
    return StatusCode(204, await _bookService.DeleteOneById(id));
  }  
}
