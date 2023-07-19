using Dapper;
using DapperASPNetCore.Context;
using DapperASPNetCore.Contracts;
using DapperASPNetCore.Dto;
using DapperASPNetCore.Entities;
using System;
using System.Collections.Generic;
using System.Data;
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

        public async Task<IEnumerable<Project>> GetProjects()
        {
            var query = "SELECT Id, Title, Description, Phase, ManagerId FROM Projects";

            using (var connection = _context.CreateConnection())
            {
                var projects = await connection.QueryAsync<Project>(query);
                return projects.ToList();
            }
        }
    }
}
