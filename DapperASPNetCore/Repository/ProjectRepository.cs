using Dapper;
using DapperASPNetCore.Context;
using DapperASPNetCore.Contracts;
using DapperASPNetCore.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DapperASPNetCore.Repository
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly DapperContext _context;

        public ProjectRepository(DapperContext context)
        {
            _context = context;
        }

        public Task<IEnumerable<Project>> GetEmployeesProject(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<IEnumerable<Project>> GetProjects()
        {
            var query = "SELECT Id, Title, Description, Phase As Status, ManagerId FROM Projects";

            using (var connection = _context.CreateConnection())
            {
                var projects = await connection.QueryAsync<Project>(query);
                return projects.ToList();
            }
        }
    }
}
