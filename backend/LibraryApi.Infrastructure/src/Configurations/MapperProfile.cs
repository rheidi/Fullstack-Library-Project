using AutoMapper;
using LibraryApi.Domain.src.Entities;
using LibraryApi.Service.src.Dtos;

namespace LibraryApi.Infrastructure.src.Configurations;

public class MapperProfile : Profile
{
  public MapperProfile()
  {
    CreateMap<User, UserReadDto>().ReverseMap();
    CreateMap<UserUpdateDto, User>();
    CreateMap<UserCreateDto, User>();

    CreateMap<Book, BookReadDto>().ReverseMap();
    CreateMap<BookUpdateDto, Book>();
    CreateMap<BookCreateDto, Book>();

    CreateMap<Author, AuthorReadDto>().ReverseMap();
    CreateMap<AuthorUpdateDto, Author>();
    CreateMap<AuthorCreateDto, Author>();

    CreateMap<Loan, LoanReadDto>().ReverseMap();
    CreateMap<LoanUpdateDto, Loan>();
    CreateMap<LoanCreateDto, Loan>();
  }  
}
