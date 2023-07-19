using DapperASPNetCore.Dto;
using DapperASPNetCore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DapperASPNetCore.Contracts
{
	public interface IManagerRepository
	{
		public Task<IEnumerable<Manager>> GetManagers();
		public Task<Manager> GetManager(int id);
		public Task<Manager> CreateManager(ManagerForCreationDto manager);
		
	}
}
