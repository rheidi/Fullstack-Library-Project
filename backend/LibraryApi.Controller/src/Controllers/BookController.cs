using LibraryApi.Domain.src.Entities;
using LibraryApi.Service.src.Abstractions;
using LibraryApi.Service.src.Dtos;

namespace LibraryApi.Controller.src.Controllers;

public class BookController : CrudController<Book, BookReadDto, BookCreateDto, BookUpdateDto>
{
  private readonly IBookService _bookService;
  public BookController(IBookService baseService) : base(baseService)
  {
    _bookService = baseService;
  }
}
