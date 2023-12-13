namespace DapperASPNetCore.Dto
{
    public class ProjectForUpdateDto
	{
		public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Status { get; set; }
        public int ManagerId { get; set; }
        public string ManagerName { get; set; }
    }
}
