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

        public async Task<IEnumerable<ProjectForUpdateDto>> GetProjectsWithManagerName()
        {
            var query = "SELECT p.Id, p.Title, p.Description, p.ManagerId, p.Phase as Status, m.Name As ManagerName " +
                "FROM Projects AS p " +
                "LEFT JOIN Managers AS m " +
                "ON p.ManagerId = m.Id ";

            using (var connection = _context.CreateConnection())
            {
                var projects = await connection.QueryAsync<ProjectForUpdateDto>(query);
                return projects.ToList();
            }
        }

        public async Task<Project> GetProject(int id)
        {
            var query = "SELECT * FROM Projects WHERE Id = @Id";

            using (var connection = _context.CreateConnection())
            {
                var project = await connection.QuerySingleOrDefaultAsync<Project>(query, new { id });

                return project;
            }
        }

        public async Task<Project> CreateProject(ProjectForCreationDto project)
        {
            var query = "INSERT INTO Projects (Title, Description, Status, ManagerId) VALUES (@Title, @Description, @Status, @ManagerId)" +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var parameters = new DynamicParameters();
            parameters.Add("Title", project.Title, DbType.String);
            parameters.Add("Description", project.Description, DbType.String);
            parameters.Add("Status", project.Status, DbType.String);
            parameters.Add("ManagerId", project.ManagerId, DbType.String);

            using (var connection = _context.CreateConnection())
            {
                var id = await connection.QuerySingleAsync<int>(query, parameters);

                var projectManager = new Project
                {
                    Id = id,
                    Title = project.Title,
                    Description = project.Description,
                    Status = (Phase)project.Status,
                    ManagerId = project.ManagerId
                };

                return projectManager;
            }
        }

        public async Task UpdateProject(int id, ProjectForUpdateDto project)
        {
            var query = "UPDATE Projects SET Title = @Title, Description = @Description, Status = @Status, ManagerId = @ManagerId WHERE Id = @Id";

            var parameters = new DynamicParameters();
            parameters.Add("Id", id, DbType.Int32);
            parameters.Add("Title", project.Title, DbType.String);
            parameters.Add("Description", project.Description, DbType.String);
            parameters.Add("Status", project.Status, DbType.String);
            parameters.Add("ManagerId", project.ManagerId, DbType.String);

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }

        public async Task DeleteProject(int id)
        {
            using (var connection = _context.CreateConnection())
            {
                var q1 = "Delete From Projects Where ManagerId = @Id";
                var q2 = "Delete From EmployeeProject Where ManagerId = @Id";

                connection.Open();
                IDbTransaction transaction = null;
                try
                {
                    using (transaction = connection.BeginTransaction())
                    {
                        var parameters = new DynamicParameters();
                        parameters.Add("Id", id, DbType.Int32);
                        await connection.ExecuteAsync(q1, parameters, transaction: transaction);
                        await connection.ExecuteAsync(q2, parameters, transaction: transaction);

                        transaction.Commit();
                    }
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }

            }
        }

    }
}
