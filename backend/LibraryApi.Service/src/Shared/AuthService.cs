using System.Security.Claims;
using JWT.Algorithms;
using JWT.Builder;
using LibraryApi.Domain.src.Abstractions;
using LibraryApi.Domain.src.Entities;
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
    var foundUserByEmail = await _userRepo.FindOneByEmail(credentials.Email) ?? throw new Exception("Username not found");
    var isAuthenticated = PasswordService.VerifyPassword(credentials.Password, foundUserByEmail.Password, foundUserByEmail.Salt);
    if (!isAuthenticated)
    {
      throw new Exception("Credentials don't match.");
    }
    return GenerateToken(foundUserByEmail);
  }

  private string GenerateToken(User user)
  {
    var token = JwtBuilder.Create()
      .WithAlgorithm(new HMACSHA256Algorithm())
      .WithSecret("my-secret-key")
      .AddClaim(ClaimName.VerifiedEmail, user.Email)
      .AddClaim(ClaimTypes.Role, user.Role.ToString())
      .Encode();
    return token;
  }  
}
