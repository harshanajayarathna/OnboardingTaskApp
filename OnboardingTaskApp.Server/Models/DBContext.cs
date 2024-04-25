using Microsoft.EntityFrameworkCore;


namespace OnboardingTaskApp.Server.Models
{
    public partial class DBContext : DbContext
    {        
        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {
        }
        public virtual DbSet<Customer> Customer { get; set; } = null!;
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<Store> Store { get; set; }
        public virtual DbSet<Sale> Sales { get; set; } 

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseSqlServer("Server=desktop-nv76j1k\\sqlexpress;Database=Onboarding_task_db;Trusted_Connection=True;TrustServerCertificate=true");
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>(entity => {
                entity.HasKey(k => k.Id);
            });

            modelBuilder.Entity<Product>(entity => {
                entity.HasKey(k => k.Id);
            });

            modelBuilder.Entity<Store>(entity => {
                entity.HasKey(k => k.Id);
            });

            modelBuilder.Entity<Sale>(entity =>
            {
                entity.HasKey(k => k.Id);
               
                entity.HasOne(s => s.Product)
                      .WithMany()
                      .HasForeignKey(s => s.ProductId);

                entity.HasOne(s => s.Customer)
                      .WithMany()
                      .HasForeignKey(s => s.CustomerId);

                entity.HasOne(s => s.Store)
                      .WithMany()
                      .HasForeignKey(s => s.StoreId);
            });


            OnModelCreatingPartial(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    }
}
