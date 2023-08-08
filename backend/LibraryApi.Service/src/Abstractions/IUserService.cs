using LibraryApi.Domain.src.Entities;
using LibraryApi.Service.src.Dtos;

namespace LibraryApi.Service.src.Abstractions;

public interface IUserService : IBaseService<User, UserDto>
{
  UserDto UpdatePassword(string id, string newPassword);
}
