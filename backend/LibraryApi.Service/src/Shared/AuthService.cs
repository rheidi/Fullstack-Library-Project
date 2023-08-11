using LibraryApi.Domain.src.Abstractions;
using LibraryApi.Service.src.Abstractions;
using LibraryApi.Service.src.Dtos;

namespace LibraryApi.Service.src.Shared;

public class AuthService : IAuthService
{
  private readonly IUserRepo _userRepo;

  public AuthService(IUserRepo userRepo)
  {
    _userRepo = userRepo;
  }

  public async Task<string> VerifyCredentials(UserCredentialsDto credentials)
  {
    var foundUserByUsername = await _userRepo.FindOneByUsername(credentials.Username);
    var isAuthenticated = PasswordService.VerifyPassword(foundUserByUsername.Password, credentials.Password, foundUserByUsername.Salt);
    if (!isAuthenticated)
    {
      throw new Exception("Cradentials don't match.");
    }
    return "GENERATE TOKEN IS STILL NEEDED"; //WORK HERE
  }
  
}
