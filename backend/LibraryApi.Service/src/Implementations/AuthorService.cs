using AutoMapper;
using LibraryApi.Domain.src.Abstractions;
using LibraryApi.Domain.src.Entities;
using LibraryApi.Service.src.Abstractions;
using LibraryApi.Service.src.Dtos;

namespace LibraryApi.Service.src.Implementations;

public class AuthorService : BaseService<Author, Author>, IAuthorService
{
  private readonly IAuthorRepo _authorRepo;
  public AuthorService(IAuthorRepo authorRepo, IMapper mapper) : base(authorRepo, mapper)
  {
    _authorRepo = authorRepo;
  }
}
