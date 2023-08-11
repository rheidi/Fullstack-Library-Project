using LibraryApi.Domain.src.Entities;

namespace LibraryApi.Domain.src.Abstractions;

public interface IUserRepo : IBaseRepo<User>
{
  Task<User> CreateAdmin(User user);
  Task<User> UpdatePassword(User user, string newPassword);
  Task<User> FindOneByUsername(string username);
}
 