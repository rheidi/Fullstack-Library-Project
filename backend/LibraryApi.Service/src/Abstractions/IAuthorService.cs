using LibraryApi.Domain.src.Entities;
using LibraryApi.Service.src.Dtos;

namespace LibraryApi.Service.src.Abstractions;

public interface IAuthorService : IBaseService<Author, AuthorReadDto, AuthorCreateDto, AuthorUpdateDto>
{
  
}
