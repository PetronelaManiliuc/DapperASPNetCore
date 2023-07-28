using DapperASPNetCore.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DapperASPNetCore.Contracts
{
    public interface IProjectRepository
    {
        public Task<IEnumerable<Project>> GetProjects();
        public Task<IEnumerable<Project>> GetEmployeesProject(int id);
    }
}
