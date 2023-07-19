﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DapperASPNetCore.Entities
{
	public class Manager
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Email { get; set; }
		public string Phone { get; set; }
		public int Age { get; set; }

		public int CompanyId { get; set; }

		public List<Project> Projects { get; set; } = new List<Project>();
	}
}
