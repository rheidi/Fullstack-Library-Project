using AutoMapper;
using LibraryApi.Domain.src.Abstractions;
using LibraryApi.Domain.src.Entities;
using LibraryApi.Service.src.Abstractions;
using LibraryApi.Service.src.Dtos;

namespace LibraryApi.Service.src.Implementations;

public class BookService : BaseService<Book, BookDto>, IBookService
{
  private readonly IBookRepo _bookRepo;
  public BookService(IBookRepo bookRepo, IMapper mapper) : base(bookRepo, mapper)
  {
    _bookRepo = bookRepo;
  }
}
