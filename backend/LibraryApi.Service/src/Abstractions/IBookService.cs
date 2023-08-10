using LibraryApi.Domain.src.Entities;
using LibraryApi.Service.src.Dtos;

namespace LibraryApi.Service.src.Abstractions;

public interface IBookService : IBaseService<Book, BookReadDto, BookCreateDto, BookUpdateDto>
{
  
}
