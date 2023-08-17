using AutoMapper;
using LibraryApi.Domain.src.Abstractions;
using LibraryApi.Domain.src.Entities;
using LibraryApi.Service.src.Abstractions;
using LibraryApi.Service.src.Dtos;

namespace LibraryApi.Service.src.Implementations;

public class BookService : BaseService<Book, BookReadDto, BookCreateDto, BookUpdateDto>, IBookService
{
  private readonly IBookRepo _bookRepo;
  private readonly IAuthorRepo _authorRepo;
  public BookService(IBookRepo bookRepo, IAuthorRepo authorRepo, IMapper mapper) : base(bookRepo, mapper)
  {
    _bookRepo = bookRepo;
    _authorRepo = authorRepo;
  }

    public override async Task<BookReadDto> CreateOne(BookCreateDto dto)
    {
      var author = await _authorRepo.FindAuthorByName(dto.Author.FirstName, dto.Author.LastName);
      if (author is not null)
      {
        Console.WriteLine("Author found!");
        Console.WriteLine(author.FirstName);
      }
      return await base.CreateOne(dto);
    }
}
