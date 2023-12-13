using DapperASPNetCore.Contracts;
using DapperASPNetCore.Dto;
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
                var projects = await _projectRepo.GetProjectsWithManagerName();
                return Ok(projects);
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{id}", Name = "ProjectById")]
        public async Task<IActionResult> GetProject(int id)
        {
            try
            {
                var project = await _projectRepo.GetProject(id);
                if (project == null)
                    return NotFound();

                return Ok(project);
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject(ProjectForCreationDto project)
        {
            try
            {
                var createdProject = await _projectRepo.CreateProject(project);
                return CreatedAtRoute("ProjectById", new { id = createdProject.Id }, createdProject);
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProject(ProjectForUpdateDto project)
        {
            try
            {
                var dbCompany = await _projectRepo.GetProject(project.Id);
                if (dbCompany == null)
                    return NotFound();

                await _projectRepo.UpdateProject(project.Id, project);
                return NoContent();
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            try
            {
                var dbCompany = await _projectRepo.GetProject(id);
                if (dbCompany == null)
                    return NotFound();

                await _projectRepo.DeleteProject(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }

    }
}
