using LibraryApi.Service.src.Dtos;

namespace LibraryApi.Service.src.Abstractions;

public interface IAuthService
{
 Task<string> VerifyCredentials(UserCredentialsDto credentials);
}
