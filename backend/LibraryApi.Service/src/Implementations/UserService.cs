using AutoMapper;
using LibraryApi.Domain.src.Abstractions;
using LibraryApi.Domain.src.Entities;
using LibraryApi.Service.src.Abstractions;
using LibraryApi.Service.src.Dtos;

namespace LibraryApi.Service.src.Implementations;

public class UserService : BaseService<User, UserDto>, IUserService
{
  private readonly IUserRepo _userRepo;
  public UserService(IUserRepo userRepo, IMapper mapper) : base(userRepo, mapper)
  {
    _userRepo = userRepo;
  }

  public UserDto UpdatePassword(string id, string newPassword)
  {
    var foundUser = _userRepo.GetOneById(id);
    if (foundUser == null)
    {
      throw new Exception(id + ": User not found");
    }
    return _mapper.Map<UserDto>(_userRepo.UpdatePassword(foundUser, newPassword));
  }
}
