using AutoMapper;
using LibraryApi.Domain.src.Abstractions;
using LibraryApi.Domain.src.Entities;
using LibraryApi.Service.src.Abstractions;
using LibraryApi.Service.src.Dtos;
using LibraryApi.Service.src.Shared;

namespace LibraryApi.Service.src.Implementations;

public class UserService : BaseService<User, UserReadDto, UserCreateDto, UserUpdateDto>, IUserService
{
  private readonly IUserRepo _userRepo;
  public UserService(IUserRepo userRepo, IMapper mapper) : base(userRepo, mapper)
  {
    _userRepo = userRepo;
  }

  public async Task<UserReadDto> UpdatePassword(Guid id, string newPassword)
  {
    var foundUser = await _userRepo.GetOneById(id);
    if (foundUser is null)
    {
      throw new Exception(id + ": User not found");
    }
    return _mapper.Map<UserReadDto>(await _userRepo.UpdatePassword(foundUser, newPassword));
  }

  public override async Task<UserReadDto> CreateOne(UserCreateDto dto)
  {
    var entity = _mapper.Map<User>(dto);
    PasswordService.HashPassword(dto.Password, out var hashedPassword, out var salt);
    entity.Password = hashedPassword;
    entity.Salt = salt;
    var created = await _userRepo.CreateOne(entity);
    return _mapper.Map<UserReadDto>(created);
  }
}
