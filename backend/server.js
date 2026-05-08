const express = require("express");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./routes/usersRouter");
const errorHandler = require("./middleware/errorMiddleware");
const openAIRouter = require("./routes/openAIRouter");
const stripeRouter = require("./routes/stripeRouter");
const User = require("./models/User");
require("./utils/connectDB")();

const app = express();

//corn for the trial period :every single days

cron.schedule("0 0 * * * *", async () => {
  console.log("This task runs every second");
  try {
    //get the current date
    const updatedUser = await User.updateMany(
      {
        trialActive: true,
        trialExpires: { $lt: today },
      },
      {
        trialActive: false,
        subscriptionPlan: "Free",
        monthlyRequestCount: 5,
      },
    );
  } catch (error) {
    console.log(error);
  }
});

//corn for the free plan:run at the end every month

cron.schedule("0 0 1 * * *", async () => {
  console.log("This task runs every second");
  try {
    //get the current date
    await User.updateMany(
      {
        subscription: "Free",
        nextBillingDate: { $lt: today },
      },
      {
        monthlyRequestCount: 0,
      },
    );
  } catch (error) {
    console.log(error);
  }
});

// corn for the basic plan :run at the end every month

cron.schedule("0 0 1 * * *", async () => {
  console.log("This task runs every second");
  try {
    //get the current date
    await User.updateMany(
      {
        subscription: "Basic",
        nextBillingDate: { $lt: today },
      },
      {
        monthlyRequestCount: 0,
      },
    );
  } catch (error) {
    console.log(error);
  }
});

// corn for the premium plan :run at the end every month

cron.schedule("0 0 1 * * *", async () => {
  console.log("This task runs every second");
  try {
    //get the current date
    await User.updateMany(
      {
        subscription: "Premium",
        nextBillingDate: { $lt: today },
      },
      {
        monthlyRequestCount: 0,
      },
    );
  } catch (error) {
    console.log(error);
  }
});

// middleware
app.use(express.json()); //paras the json data
app.use(cookieParser()); //pass the cookie automatically
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/openai", openAIRouter);
app.use("/api/v1/stripe", stripeRouter);

//Error handler middleware
app.use(errorHandler);

//start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is runing ${PORT}`);
});
