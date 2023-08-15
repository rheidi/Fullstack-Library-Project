using LibraryApi.Domain.src.Entities;

namespace LibraryApi.Domain.src.Abstractions;

public interface IUserRepo : IBaseRepo<User>
{
  Task<User> CreateAdmin(User user);
  Task<User> UpdatePassword(User user);
  Task<User?> FindOneByEmail(string email);
}
 