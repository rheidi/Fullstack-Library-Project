using AutoMapper;
using LibraryApi.Domain.src.Entities;
using LibraryApi.Service.src.Dtos;

namespace LibraryApi.Infrastructure.src.Configurations;

public class MapperProfile : Profile
{
  public MapperProfile()
  {
    CreateMap<User, UserReadDto>();
    CreateMap<UserUpdateDto, User>();
    CreateMap<UserCreateDto, User>();

    CreateMap<Book, BookReadDto>();
    CreateMap<BookUpdateDto, Book>();
    CreateMap<BookCreateDto, Book>();

    CreateMap<Author, AuthorReadDto>();
    CreateMap<AuthorUpdateDto, Author>();
    CreateMap<AuthorCreateDto, Author>();

    CreateMap<Loan, LoanReadDto>();
    CreateMap<LoanUpdateDto, Loan>();
    CreateMap<LoanCreateDto, Loan>();
  }  
}
