using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DapperASPNetCore.Dto
{
	public class ManagerForCreationDto
	{
		public string Name { get; set; }
		public int Age { get; set; }
		public string Email { get; set; }
		public string Phone { get; set; }
		public int CompanyId { get; set; }
	}
}
