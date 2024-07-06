const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const userRoutes = (app) => {
  app.post("/api/users", async (req, res) => {
    const { email, firstName, lastName } = req.body;

    try {
      const user = await prisma.user.upsert({
        where: { email },
        update: { firstName, lastName },
        create: { email, firstName, lastName },
      });

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to save user data" });
    }
  });
};

module.exports = userRoutes;
