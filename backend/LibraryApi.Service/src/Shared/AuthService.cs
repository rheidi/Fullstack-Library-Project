using System.Security.Claims;
using JWT.Algorithms;
using JWT.Builder;
using LibraryApi.Domain.src.Abstractions;
using LibraryApi.Domain.src.Entities;
using LibraryApi.Service.src.Abstractions;
using LibraryApi.Service.src.Dtos;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;

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
    var claims = new List<Claim>{
      new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
      new Claim(ClaimTypes.Role, user.Role.ToString()),
      new Claim(ClaimTypes.Email, user.Email)
    };
    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("my-secrete-key-jsdguyfsdgcjsdbchjsdb jdhscjysdcsdj"));
    var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
    var securityTokenDescriptor = new SecurityTokenDescriptor
    {
        Issuer = "library-backend",
        Expires = DateTime.Now.AddMinutes(10),
        Subject = new ClaimsIdentity(claims),
        SigningCredentials = signingCredentials
    };
    var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
    var token = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);
    return jwtSecurityTokenHandler.WriteToken(token);
  }  
}
