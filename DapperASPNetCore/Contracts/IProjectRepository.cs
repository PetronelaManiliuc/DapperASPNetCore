using DapperASPNetCore.Dto;
using DapperASPNetCore.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DapperASPNetCore.Contracts
{
    public interface IProjectRepository
    {
        public Task<IEnumerable<Project>> GetProjects();
        public Task<IEnumerable<ProjectForUpdateDto>> GetProjectsWithManagerName();
        public Task<IEnumerable<Project>> GetEmployeesProject(int id);
        public Task<Project> GetProject(int id);
        public Task<Project> CreateProject(ProjectForCreationDto project);
        public Task UpdateProject(int id, ProjectForUpdateDto project);
        public Task DeleteProject(int id);
    }
}
