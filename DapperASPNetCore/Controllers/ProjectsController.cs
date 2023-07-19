using DapperASPNetCore.Contracts;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace DapperASPNetCore.Controllers
{
    [Route("api/projects")]
	[ApiController]
	public class ProjectsController : ControllerBase
	{
		private readonly IProjectRepository _projectRepo;

		public ProjectsController(IProjectRepository projectRepo)
		{
			_projectRepo = projectRepo;
		}

		[HttpGet]
		public async Task<IActionResult> GetProjects()
		{
			try
			{
				var projects = await _projectRepo.GetProjects();
				return Ok(projects);
			}
			catch (Exception ex)
			{
				//log error
				return StatusCode(500, ex.Message);
			}
		}

	}
}
