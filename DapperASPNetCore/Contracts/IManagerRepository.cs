using DapperASPNetCore.Dto;
using DapperASPNetCore.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DapperASPNetCore.Contracts
{
    public interface IManagerRepository
    {
        public Task<IEnumerable<Manager>> GetManagers();
        public Task<IEnumerable<Manager>> GetManagersByCompanyId(int companyId);
        public Task<Manager> GetManager(int id);
        public Task<Manager> CreateManager(ManagerForCreationDto manager);
        public Task UpdateManager(int id, ManagerForCreationDto manger);
        public Task DeleteManager(int id);

        //	public Task<Manager> GetManagerwithDependencies(int id);
    }
}
