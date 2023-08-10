using LibraryApi.Domain.src.Entities;
using LibraryApi.Service.src.Dtos;

namespace LibraryApi.Service.src.Abstractions;

public interface IUserService : IBaseService<User, UserReadDto, UserCreateDto, UserUpdateDto>
{
  Task<UserReadDto> UpdatePassword(string id, string newPassword);
}
