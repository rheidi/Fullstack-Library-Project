using AutoMapper;
using LibraryApi.Domain.src.Abstractions;
using LibraryApi.Domain.src.Entities;
using LibraryApi.Infrastructure.src.Configurations;
using LibraryApi.Service.src.Dtos;
using LibraryApi.Service.src.Implementations;
using Moq;

namespace LibraryApi.Testing;

public class UserServiceTests
{
  private readonly Mock<IUserRepo> _userRepoMock;
  private readonly IMapper _mapper;

  public UserServiceTests()
  {
    _userRepoMock = new Mock<IUserRepo>();
    var mapperConfig = new MapperConfiguration(config =>
    {
      config.AddProfile<MapperProfile>();
    });
    _mapper = mapperConfig.CreateMapper();
  }

  [Fact]
  public async Task CreateOne_WithValidDto_ReturnsCreatedUser()
  {
  var createDto = new UserCreateDto { Email = "test@mail.com", Password = "test123" };
  var expectedUser = new User { Id = Guid.NewGuid(), Email = createDto.Email, Password = "hashedPassword", Salt = new byte[] { 0x01, 0x02, 0x03 } };
  _userRepoMock.Setup(repo => repo.CreateOne(It.IsAny<User>())).ReturnsAsync(expectedUser);

  var userService = new UserService(_userRepoMock.Object, _mapper);

  var result = await userService.CreateOne(createDto);

  Assert.NotNull(result);
  Assert.Equal(expectedUser.Id, result.Id);
  Assert.Equal(expectedUser.Email, result.Email);
  }

  [Fact]
  public async Task UpdateOne_WithValidDto_ReturnsEditedUser()
  {
    var id = Guid.NewGuid();
    var editDto = new UserUpdateDto { FirstName = "New", LastName = "Name"};
    var userToUpdate = new User { Id = id, FirstName = "oldFirstName", LastName = "oldLastName", Password = "hashedPassword", Salt = new byte[] { 0x01, 0x02, 0x03 } };
    var expectedUser = new User { Id = id, FirstName = editDto.FirstName, LastName = editDto.LastName, Password = "hashedPassword", Salt = new byte[] { 0x01, 0x02, 0x03 } };
    
    var userService = new UserService(_userRepoMock.Object, _mapper);

    var result = await userService.UpdateOneById(id, editDto);

    Assert.NotNull(result);
    Assert.Equal(expectedUser.FirstName, result.FirstName);
    Assert.Equal(expectedUser.LastName, result.LastName);
  }
}
