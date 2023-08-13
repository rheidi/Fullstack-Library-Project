using LibraryApi.Domain.src.Entities;
using LibraryApi.Domain.src.Abstractions;
using LibraryApi.Infrastructure.src.Database;
using Microsoft.EntityFrameworkCore;

namespace LibraryApi.Infrastructure.src.RepoImplementations;

public class UserRepo : BaseRepo<User>, IUserRepo
{
  private readonly DbSet<User> _users;
  private readonly DatabaseContext _context;

  public UserRepo(DatabaseContext dbContext) : base(dbContext)
  {
    _users = dbContext.Users;
    _context = dbContext;
  }

  public async Task<User> CreateAdmin(User user)
  {
    user.Role = Role.Admin;
    await _users.AddAsync(user);
    await _context.SaveChangesAsync();
    return user;
  }

  public async Task<User?> FindOneByUsername(string username)
  {
    return await _users.FirstOrDefaultAsync(u => u.UserName == username);
  }

  public async Task<User> UpdatePassword(User user)
  {
    _users.Update(user);
    await _context.SaveChangesAsync();
    return user;
  }
}
