using LibraryApi.Domain.src.Shared;
using LibraryApi.Service.src.Abstractions;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApi.Controller.src.Controllers;

[ApiController]
[Route("api/v1/[controller]s")]
public class CrudController<T, TReadDto, TCreateDto, TUpdateDto> : ControllerBase
{
  private readonly IBaseService<T, TReadDto, TCreateDto, TUpdateDto> _baseService;

  public CrudController(IBaseService<T, TReadDto, TCreateDto, TUpdateDto> baseService)
  {
    _baseService = baseService;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<TReadDto>>> GetAll([FromQuery] QueryOptions queryOptions)
  {
    return Ok(await _baseService.GetAll(queryOptions));
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<TReadDto>> GetOneById ([FromRoute] string id)
  {
    return Ok(await _baseService.GetOneById(id));
  }

  [HttpPost]
  public async Task<ActionResult<TReadDto>> CreateOne([FromBody] TCreateDto dto)
  {
    var createdObject = await _baseService.CreateOne(dto);
    return CreatedAtAction("Created", createdObject);
  }

  [HttpPatch("{id}")]
  public async Task<ActionResult<TReadDto>> UpdateOneById([FromRoute] string id, [FromBody] TUpdateDto updateDto)
  {
    var updatedObject = await _baseService.UpdateOneById(id, updateDto);
    return Ok(updatedObject);
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult<bool>> DeleteOneById([FromRoute] string id)
  {
    return StatusCode(204, await _baseService.DeleteOneById(id));
  }
}
