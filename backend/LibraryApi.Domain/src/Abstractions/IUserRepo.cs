using LibraryApi.Domain.src.Entities;

namespace LibraryApi.Domain.src.Abstractions;

public interface IUserRepo : IBaseRepo<User>
{
  User CreateAdmin(User user);
  User UpdatePassword(User user, string newPassword);
}
 